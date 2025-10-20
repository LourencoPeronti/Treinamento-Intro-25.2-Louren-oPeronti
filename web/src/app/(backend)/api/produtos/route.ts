import { NextRequest, NextResponse } from "next/server";
import { getAllProdutos, createProduto } from "../../services/produto"

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
    const data = await req.json();
    const novoProduto = await createProduto(data);
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}