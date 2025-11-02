import { NextRequest, NextResponse } from "next/server";
import { getAllProdutos, createProduto } from "../../services/produto"
import { returnInvalidDataErrors, validBody } from "@/utils";
import { produtoSchema } from "../../schemas";

export async function GET() {
  try {
    const produtos = await getAllProdutos();
    return NextResponse.json(produtos);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await validBody(req)
    const validation = produtoSchema.safeParse(body)

    if(!validation.success){
      return returnInvalidDataErrors(validation.error)
    }

    const validated = validation.data
  
    const novoProduto = await createProduto(validated);
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}