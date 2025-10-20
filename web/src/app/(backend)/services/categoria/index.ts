import prisma from "../db"

// pega todas as categorias
export async function getAllCategorias(){
  try {
    const categorias = await prisma.categoria.findMany({
    orderBy: {
      nome: 'asc'
    }
  })
  return categorias
  } catch (error) {
    throw new Error(String(error) || 'Nã foi possível listar as categorias')
  }
}

//deleta uma categoria pelo seu Id
export async function deleteCategoria(id: string){
  try {
    await prisma.produtoCategoria.deleteMany({
    where: { categoriaId: id },
  });
    const categoria = await prisma.categoria.delete({
    where: {
      id: id,
    }
  })
  } catch (error) {
    throw new Error(String(error) || 'Nã foi possível deletar categoria')
  }
  
}

//cria uma nova categoria
export async function createCategoria(data: {
  nome: string;
  produtoIds?: string[];
}){
  try {
    const categoria = await prisma.categoria.create({
      data: {
        nome: data.nome,
        produtos: data.produtoIds?.length
          ? {
              create: data.produtoIds.map((produtoId) => ({
                produto: { connect: { id: produtoId } },
              })),
            }
          : undefined,
      },
      include: {
        categoria: { include: { produto: true } }
      },
    });

    return categoria;
  } catch (error) {
    throw new Error(String(error) || 'Nã foi possível criar categoria')
  }
}

//adiciona um produto novo a categoria
export async function updateAdcProduto(id: string, produtoIds: string[]){
  try {
    const categoria = await prisma.categoria.update({
      where: { id: id },
      data: {
        produtos: {
          create: produtoIds.map((produtoId) => ({
            produto: { connect: { id: produtoId } },
          })),
        },
      },
      include: { categoria: { include: { produto: true } } },
    });

    return categoria;
  } catch (error) {
    throw new Error(String(error) || 'Nã foi possível adicionar produto')
  }
}

//remove um produto da categoria
export async function updateRemoveProduto(id: string, produtoIds: string[]){
  try {
    const categoria = await prisma.categoria.update({
      where: { id: id },
      data: {
        produtos: {
          deleteMany: produtoIds.map((produtoId) => ({
            produtoId,
          })),
        },
      },
      include: { produtos: { include: { produto: true } } },
    });

    return categoria;
  } catch (error) {
    throw new Error(String(error) || 'Nã foi possível remover produto')
  }
}