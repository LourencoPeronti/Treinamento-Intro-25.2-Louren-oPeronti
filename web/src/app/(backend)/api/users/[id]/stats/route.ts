import prisma from "@/app/(backend)/services/db"
import { getProdutoById } from "@/app/(backend)/services/produto";


export async function GET(request: Request, {params}: {params: {id:string}}){

  const userId = params.id
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

    if(compras.length == 0){
      return new Response(JSON.stringify({
        totalGasto: 0,
        numeroCompras: 0, 
        produtoMaisComprado: null
      }))
    }

    const totalGasto = compras.reduce(
      (total, compra) => total + compra.PrecoTotal,
      0
    )

    const numeroCompras = compras.length

    const pegaProdutoMaisComprado = await prisma.compraProduto.groupBy({
      by: ['produtoId'],
      where: {
        compra: {
          user: {
            some: {userId}
          }
        }
      },
      _sum: {
        quantidade: true
      },
      orderBy: {
        _sum: {
          quantidade: 'desc'
        }
      },
      take: 1
    })

    const idProdutoMaisComprado = pegaProdutoMaisComprado[0].produtoId

    const produtoMaisComprado = await getProdutoById(idProdutoMaisComprado)
    
    return new Response(JSON.stringify({
        totalGasto,
        numeroCompras, 
        produtoMaisComprado: produtoMaisComprado.nome
      }))

  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}