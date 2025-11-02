import prisma from "../db"
//pega todos os produtos
export async function getAllProdutos(){
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: {
        preco: 'desc'
      }
    })
    return produtos
  } catch(error){
    throw new Error(String(Error) || "Falha ao pegar os produtos")
  }
}

//pega o produto pelo Id.
export async function getProdutoById(id: string){
  try {
    const produto = await prisma.produto.findUnique({
      where: {
        id: id, 
      }
    })
    return produto
  } catch (error) {
    throw new Error(String(error) || "Falha ao buscar produto")
  }
}

//Pega os produtos de uma categoria
export async function getProdutoByCategoria(categoriaId: string){
  try {
    const produto = await prisma.produto.findMany({
      where: {
        categoria: {
          some: {
            categoriaId: categoriaId, 
          },
        },
      },
      include: {
        categoria: { include: { categoria: true } },
    }})
  } catch (error) {
    throw new Error(String(error) || "Falha ao buscar produto")
  }
}
 export async function createProduto( data: {       
  nome: string;    
  preco: number;     
  descricao: string;
  img: string 
 }){
  try {
    const produto = await prisma.produto.create({
      data: {
        nome: data.nome,
        preco: data.preco,
        descricao: data.descricao,
        img: data.img
      } 
    }) 
    return produto
  } catch (error) {
    throw new Error(String(error) || "Falha ao criar Produto")
  }
 }

 //deleta o produto
 export async function deleteProduto(id: string){
  try {
    const produtoDelete = await prisma.produto.delete({
      where: {
        id: id,
      }
    })
    return produtoDelete
  } catch (error) {
    throw new Error(String(error) || "Falha ao deletar matéria")
  }
 }

 //edita o produto
 export async function updateProduto(id: string, data){
  try {
    const produtoUpdated = await prisma.produto.update({
      where: { id },
      data, 
    })
    return produtoUpdated
  } catch (error) {
    throw new Error(String(error) || "Falha ao atualizar produto")
  }
 }

 