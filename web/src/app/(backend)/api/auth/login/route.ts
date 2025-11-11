
import { loginSchema } from "@/app/(backend)/schemas";
import { auth } from "@/auth";
import { validBody } from "@/utils";
import { handleError } from "@/app/(backend)/utils/handleError";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
  try {
    const body = await validBody(req);
    const validation = loginSchema.safeParse(body)

    if (!validation.success) {
        throw validation.error
    }
    const validated = validation.data

    const { email, password } = validated

    const result = await auth.api.signInEmail({
      body: { 
        email, 
        password,
        callbackURL: "/"
      },
    })

    return new Response(JSON.stringify({result}), { status: 200 });
  } catch (error: any) {

    return handleError(error)
    //return new Response(JSON.stringify({erro: error}))
    /*if (error.body.message.includes("Invalid email or password")) {
      return new Response(JSON.stringify({ error: "Email ou senha incorretos" }), { status: 401 });
    } else {
      return new Response(JSON.stringify({ error: "Login falhou" }), { status: 400 });
    }*/
  }
}
//arrumar o tratamento de erros, tratando certinho como ele manda na resposta
