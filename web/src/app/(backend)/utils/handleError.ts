import { ZodError } from "zod";
import { ValidationError } from "better-auth/react";

export function handleError(error: any){
    if(error instanceof ZodError){
      const message = JSON.parse(error.message)
      return new Response(JSON.stringify(
        {
        body:{
          success: false,
          mensagem: "Erro de validação",
          tipo: message[0].message
        },
      }
      ), {status: 400}) 
    }

    /*if(error?.body?.message == "Invalid email or password"){
        return new Response(JSON.stringify(
          {
            body:{
              success: false,
              message: "Email ou senha incorretos",
          },
      }
      ), {status: 400}) 
    }*/

    return new Response(JSON.stringify({
      body:{
          success: false,
          message: "Erro interno do servidor"
        },
    }), {status: 500})
  }