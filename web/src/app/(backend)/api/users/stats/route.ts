import { getCompraByUserId } from "@/app/(backend)/services/compra";
import prisma from "@/app/(backend)/services/db"
import { getProdutoById } from "@/app/(backend)/services/produto";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";


export async function GET(request: Request){
  
  try {
    const session = await auth.api.getSession({headers: request.headers})
    const userId = session.user.id
    const compras = await getCompraByUserId(userId)

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
        produtoMaisComprado: produtoMaisComprado?.nome
      }))

  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}