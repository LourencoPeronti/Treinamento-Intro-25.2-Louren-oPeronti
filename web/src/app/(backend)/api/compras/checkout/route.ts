import { auth } from "@/auth";
import prisma from "@/app/(backend)/services/db";
import { NextResponse } from "next/server";
import { createCompra } from "@/app/(backend)/services/compra";

export async function POST(req: Request){
  try {
    const session = await auth.api.getSession({headers: req.headers})
    const body = await req.json()
   
    const compra = await createCompra({
    produtos: body.produtos,
    userIds: [session.user.id],
})

 return new Response(JSON.stringify({message: "compra efetivada com sucesso", compra: compra}), {status: 200})
  } catch (error: any) {
    return NextResponse.json(
      {error: error|| "erro ao efetivar a compra"}
    )
  }
}