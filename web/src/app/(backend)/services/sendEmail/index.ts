import { Resend } from "resend"

const resend = new Resend("re_VwhK7rbS_Fp8MHm29rMMtrMa3QWGQSWoh")

export async function sendEmail(to: string, subject: string, body: string){
  const { data, error } = await resend.emails.send({
      from: 'Lourenco <Lourenco@resend.dev>',
      to: [to],
      subject,
      react: body 
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

}