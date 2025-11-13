import { statusSchema } from "@/app/(backend)/schemas"
import { getCompraById, upsateStatusCompra } from "@/app/(backend)/services/compra"
import { sendEmail } from "@/app/(backend)/services/sendEmail"
import { findUserById } from "@/app/(backend)/services/users"

export async function PATCH(req: Request, { params }: {params: {id: string}}){
  try {
    const body = await req.json()
    const validation = statusSchema.safeParse(body.status)
    const compra = await getCompraById(params.id)
    const userId = compra[0].userId
    const user = await findUserById(userId)
    
    if(!validation.success){
        return new Response(JSON.stringify({error: "Status inválido"}), {status: 400})
    }
    const Status = validation.data

    const compraAtualizada = await upsateStatusCompra(params.id, Status)

    if (user?.email) {
      switch (Status) {
      case "Paid":
        await sendEmail(user?.email, "Pagamento Confirmado", "Sua compra foi atualizada para o status Paid")
        break;
    
      case "Shipped":
        await sendEmail(user?.email, "Seu pedido foi enviado", "Sua compra foi atualizada para o status Shipped")
        break;

      case "Delivered":
        await sendEmail(user?.email, "Compra entregue", "Seu pedido foi entregue com sucesso")
    }
    } 
    return new Response(JSON.stringify(compraAtualizada))
  } catch (error) {
    return new Response(JSON.stringify(error), {status: 404})
  }
   
}