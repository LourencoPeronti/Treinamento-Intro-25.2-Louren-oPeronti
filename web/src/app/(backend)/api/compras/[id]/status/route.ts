import { statusSchema } from "@/app/(backend)/schemas"
import { upsateStatusCompra } from "@/app/(backend)/services/compra"


export async function PATCH(req: Request, { params }: {params: {id: string}}){
  try {
    const body = await req.json()
    const validation = statusSchema.safeParse(body.status)

    if(!validation.success){
        return new Response(JSON.stringify({error: "Status inválido"}), {status: 400})
    }
    const Status = validation.data

    const compraAtualizada = await upsateStatusCompra(params.id, Status)

    return new Response(JSON.stringify(compraAtualizada))
  } catch (error) {
    return new Response(JSON.stringify(error), {status: 404})
  }
   
}