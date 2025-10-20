import { NextResponse } from "next/server";
import {
  getAllCategorias,
  createCategoria
} from "../../services/categoria";

export async function GET() {
  try {
    const categorias = await getAllCategorias();
    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao listar categorias" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const categoria = await createCategoria(data);
    return NextResponse.json(categoria, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}