import { NextRequest, NextResponse } from "next/server";

import { registerSchema } from "@/backend/schemas";
import { returnInvalidDataErrors, validBody, zodErrorHandler } from "@/utils/api";
import { auth } from "@/auth";
import { findUserByEmail } from "@/app/(backend)/services/users";
import { handleError } from "@/app/(backend)/utils/handleError";


export async function POST(request: NextRequest) {
  try {
    const body = await validBody(request);
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      throw validationResult.error
    }
    
    const validatedData = validationResult.data

    const { name, email, password } = validatedData;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { 
          error: "Usuário já existe",
          field: "email" 
        },
        { status: 409 }
      );
    }    
    
    const user = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/",
      }
    });

    return NextResponse.json(
      { 
        message: "Usuário criado com sucesso",
        user 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }

    return handleError(error);    
  }
}