import { auth } from "@/auth";
import prisma from "@/app/(backend)/services/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try {
    //checa se o usuário está logado
    const session = await auth.api.getSession({headers: req.headers})
    if(!session){
      return new Response(JSON.stringify({erro: "Usuário não logado"}), {status: 401})
    }

    const body = await req.json()
    /*Requisição do tipo: 
    {
      itens: [
        {
          produtoId: "123",
          quantidade: 2
          preco: 149,90
        }
      ]

    } */
    const { itens } = body

    const precoTotal = itens.reduce(
      (total: number, item: {preco: number, quantidade: number}) => total + item.preco * item.quantidade, 0
    )

    const compra = await prisma.compra.create({
        data: {
          PrecoTotal: precoTotal,
          user: {
            create: {
              user: {
                connect: { id: session.user.id }
               },
            },
          },
          compra: {
            create: itens.map((item: { quantidade: number; produtoId: string; }) => ({
              quantidade: item.quantidade,
              produto: { connect: { id: item.produtoId } },
            })),
          },
        },
        include: {
          compra: { include: { produto: true } },
          user: { include: { user: true } },
        },
});
return new Response(JSON.stringify({message: "Compra efetivada com sucesso", compra}), {status: 200})
  } catch (error) {
    return NextResponse.json(
      {error: error.message || "erro ao efetivar a compra"}
    )
  }
}