import { NextResponse } from "next/server";
import { deleteCategoria } from "../../../services/categoria";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteCategoria(params.id);
    return NextResponse.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar categoria" },
      { status: 500 }
    );
  }
}
