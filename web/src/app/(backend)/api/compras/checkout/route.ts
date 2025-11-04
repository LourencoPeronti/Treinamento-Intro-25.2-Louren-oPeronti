import { auth } from "@/auth";
import prisma from "@/app/(backend)/services/db";
import { NextResponse } from "next/server";
import { createCompra } from "@/app/(backend)/services/compra";

export async function POST(req: Request){
  try {
    //checa se o usuário está logado
    const session = await auth.api.getSession({headers: req.headers})
    if(!session){
      return new Response(JSON.stringify({erro: "Usuário não logado"}), {status: 401})
    }

    const body = await req.json()
   
  const compra = await createCompra({
  produtos: body.produtos,
  userIds: body.userIds,
})

return new Response(JSON.stringify({message: "Compra efetivada com sucesso", compra}), {status: 200})
  } catch (error: any) {
    return NextResponse.json(
      {error: error.message || "erro ao efetivar a compra"}
    )
  }
}