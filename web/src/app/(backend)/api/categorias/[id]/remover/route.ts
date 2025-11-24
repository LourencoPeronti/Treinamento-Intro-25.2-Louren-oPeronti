import { NextResponse } from "next/server";
import { updateRemoveProduto } from "../../../../services/categoria";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { produtoIds } = await req.json();
    const categoria = await updateRemoveProduto(params.id, produtoIds);
    return NextResponse.json(categoria);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao remover produtos da categoria" },
      { status: 500 }
    );
  }
}