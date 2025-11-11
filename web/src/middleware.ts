/*Passos a fazer:
  1º: Checar se o usuário está logado; 
  2º: Bloquear caso não esteja logado;
  3º: Seguir em frente caso esteja logado;
  4º: Definir rotas protegidas.
*/

import { auth } from "@/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest){
  //1º 
    const session = await auth.api.getSession({
      headers: await headers()
    })
  //2º
    if(!session){
      return new Response(JSON.stringify({
        body: {
          success: false,
          message: "Usuário não logado"
        }
      }), {status: 401})
    }
  //3º
    return NextResponse.next()
}   

//4º
export const config = {
  runtime: "nodejs",
  matcher: ["/api/produtos/:path*", "/api/compras/:path*", "/api/auth/logout", "/api/users/:path*"]
}
