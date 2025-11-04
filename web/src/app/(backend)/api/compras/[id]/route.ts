import { NextRequest, NextResponse } from "next/server";
import { updateCompra, deleteCompra } from "../../../services/compra";
import prisma from "../../../services/db";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const compra = await prisma.compra.findUnique({
      where: { id: params.id },
      include: {
        compra: { include: { produto: true } },
        user: { include: { user: true } },
      },
    });

    if (!compra)
      return NextResponse.json({ error: "Compra não encontrada" }, { status: 404 });

    return NextResponse.json(compra);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const data = await req.json();
    const compraAtualizada = await updateCompra(params.id, data);
    return NextResponse.json(compraAtualizada, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar compra:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE({ params }: Params) {
  try {
    const compraDeletada = await deleteCompra(params.id);
    return NextResponse.json(compraDeletada, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar compra:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}