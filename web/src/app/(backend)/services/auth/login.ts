import { auth } from "@/auth";



export async function loginUser(email: string, password: string){
  
   const result = await auth.api.signInEmail({
        body: { 
          email, 
          password,
          callbackURL: "/"
        },
      })

      return result
}