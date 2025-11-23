import { NextRequest, NextResponse } from "next/server";
import { getAllProdutos, createProduto } from "../../services/produto"
import { returnInvalidDataErrors, validBody } from "@/utils";
import { produtoSchema } from "../../schemas";
import { handleError } from "../../utils/handleError";
import {PutObjectCommand} from '@aws-sdk/client-s3'
import {s3} from '@/lib/s3'

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
    const form = await req.formData()
    const rawData = {
      nome: form.get("nome"),
      preco: Number(form.get("preco")),
      descricao: form.get("descricao")
    }

   //const valid = rawData.validBody()
    const validation = produtoSchema.safeParse(rawData)

    if(!validation.success){
      throw validation.error
    }

    const file = form.get("file") as File | null
    if(!file){
      return new NextResponse(JSON.stringify({ message: "deu errado" }))
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}-${file.name}`

     s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type
      })
    )
    
    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    console.log("CWB: ", process.cwd())

    const {nome, preco, descricao} = validation.data
    const validated = {
      nome,
      preco,
      descricao,
      img: imageUrl
    }
    const novoProduto = await createProduto(validated);
    return NextResponse.json({novoProduto}, { status: 201 });
  } catch (error) {
    console.log("ERRO REAL: ", error)
    return handleError(error);
  }
}