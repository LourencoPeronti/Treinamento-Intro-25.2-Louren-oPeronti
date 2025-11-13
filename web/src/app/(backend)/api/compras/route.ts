import { NextRequest, NextResponse } from "next/server";
import { createCompra, getCompraByUserId } from "../../services/compra";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const novaCompra = await createCompra(data);
    return NextResponse.json(novaCompra, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar compra:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // pega o userId dos parâmetros da query: /api/compras?userId=123
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId)
      return NextResponse.json(
        { error: "Parâmetro 'userId' é obrigatório" },
        { status: 400 }
      );

    const compras = await getCompraByUserId(userId);
    return NextResponse.json(compras, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}