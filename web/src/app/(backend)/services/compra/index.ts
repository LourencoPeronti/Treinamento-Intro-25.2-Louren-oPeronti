import { Status } from "@/generated/prisma";
import prisma from "../db"

//cria uma compra
export async function createCompra(data: {
  produtos: { id: string; quantidade: number }[];
  userIds: string[];
}){
  try {
    const produtoIds = data.produtos.map(p => p.id);
    const produtosDoBanco = await prisma.produto.findMany({
      where: { id: { in: produtoIds } },
      select: { id: true, preco: true },
    })
     let precoTotal = 0;
      data.produtos.forEach((p) => {
        const produto = produtosDoBanco.find((prod) => prod.id === p.id);
        if (produto) {
          precoTotal += produto.preco * p.quantidade;
        }
      });
      //cria a compra e relaciona-a com o produto e o user
      const compra = await prisma.compra.create({
        data: {
          PrecoTotal: precoTotal,
          compra: {
            create: data.produtos.map((p) => ({
              produto: { connect: { id: p.id } },
              quantidade: p.quantidade,
            })),
          },
          user: {
            create: data.userIds.map((userId) => ({
              user: { connect: { id: userId } },
            })),
},
        },
        include: {
          compra: { include: { produto: true } },
          user: { include: { user: true } },
        },
      });
      return compra
  } catch (error) {
    throw new Error(String(Error) || "Falha ao criar compra")
  }
}
// atualiza o status de uma compra
export async function upsateStatusCompra(compraId: string, status: Status){
  const compraAtualizada = await prisma.compra.update({
    where: {id: compraId},
    data: { status: status},
  })

  return compraAtualizada
}

//atualiza uma compra
export async function updateCompra(compraId: string, data: { produtos: { id: string; quantidade: number }[] }){
  try {
      const produtosDoBanco = await prisma.produto.findMany({
        where: { id: { in: data.produtos.map(p => p.id) } },
        select: { id: true, preco: true },
      });

      let precoTotal = 0;
      data.produtos.forEach((p) => {
        const produto = produtosDoBanco.find((prod) => prod.id === p.id);
        if (produto) precoTotal += produto.preco * p.quantidade;
      });

      const compraAtualizada = await prisma.compra.update({
        where: { id: compraId },
        data: { PrecoTotal: precoTotal },
      });

      await prisma.compraProduto.deleteMany({ where: { compraId } });

      await Promise.all(
        data.produtos.map((p) =>
          prisma.compraProduto.create({
            data: {
              compraId,
              produtoId: p.id,
              quantidade: p.quantidade,
            },
          })
        )
      );

      return prisma.compra.findUnique({
        where: { id: compraId },
        include: {
          compra: { include: { produto: true } },
          user: { include: { user: true } }, // usuários permanecem os mesmos
        },
      });
  } catch (error) {
    throw new Error(String(Error) || "Falha ao criar compra")
  }
}

//deleta uma compra pelo id
export async function deleteCompra(compraId: string) {
    try {
      await prisma.compraProduto.deleteMany({
        where: { compraId },
      });
      await prisma.userCompra.deleteMany({
        where: { compraId },
      });
      const compraDeletada = await prisma.compra.delete({
        where: { id: compraId },
      });
      return compraDeletada;
    } catch (error) {
      console.error("Erro ao deletar compra:", error);
      throw new Error("Erro ao deletar compra");
    }
  }

  //pega as compras de um usuário, identificando-o pelo id
export async function getCompraById(userId: any){
  try {
    const compras = await prisma.compra.findMany({
      where: {
        user: { some: { userId } },
      },
      include: {
        compra: {
          include: { produto: true },
        },
      },
    });

  return compras
  } catch (error) {
    throw new Error(String(error) || 'Falha ao procurar compra')
  }
}
