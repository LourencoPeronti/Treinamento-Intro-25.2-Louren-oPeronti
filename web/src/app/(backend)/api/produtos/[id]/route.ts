import { NextRequest, NextResponse } from "next/server";
import {
  geProdutoById,
  updateProduto,
  deleteProduto,
} from "../../../services/produto";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const produto = await geProdutoById(params.id);
    if (!produto) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const data = await req.json();
    const produtoAtualizado = await updateProduto(params.id, data);
    return NextResponse.json(produtoAtualizado);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const produtoDeletado = await deleteProduto(params.id);
    return NextResponse.json(produtoDeletado);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}