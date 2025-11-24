import { NextResponse } from "next/server";
import { updateAdcProduto } from "../../../../services/categoria";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { produtoIds } = await req.json();
    const categoria = await updateAdcProduto(params.id, produtoIds);
    return NextResponse.json(categoria);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao adicionar produtos à categoria" },
      { status: 500 }
    );
  }
}