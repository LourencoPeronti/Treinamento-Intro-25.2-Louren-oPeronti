
import { auth } from "@/auth";
import { handleError } from "@/app/(backend)/utils/handleError";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
  try {
    await auth.api.signOut({
      headers: await headers()
    })
    return new Response(JSON.stringify({
      body: {
        success: true,
        message: "Usuário deslogado"
      }
    }))
  } catch (error: any) {
    return handleError(error)
  }
}