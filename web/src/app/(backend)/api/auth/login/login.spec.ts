import { it, describe, expect, vi } from "vitest";
import { loginUser } from "@/app/(backend)/services/auth/login";
import { auth } from "@/auth";

vi.mock("@/auth", () => ({
  auth: {
    api: {
      signInEmail: vi.fn(),
    },
  },
}));

describe("loginUser", () => {
  const email = "test@example.com";
  const password = "password123";

  //Retorna erro de validação em caso de credenciais com tipo errado (email)
  it("Should return error in case of wrong type of credentials (zod errors)", async() => {
    const mockResult = { body: {success: false, message: "Erro de validação", tipo: "Email inválido"}, status: 400 };
    (auth.api.signInEmail as any).mockResolvedValueOnce(mockResult);
    const result = await loginUser("testexample.com", "password123");
    expect(result).toBe(mockResult);
  })

  //Retorna um usuário válido em caso de login com sucesso
  it("Should return valid user and status 200 on successfun login", async () => {
    const mockResult = { user: { id: "user-id", email: email }, status: 200 };
    (auth.api.signInEmail as any).mockResolvedValueOnce(mockResult);
    const result = await loginUser(email, password);
    expect(result).toBe(mockResult)
    
  })

  //Testa erros em caso de senha ou email incoretos
  it("should return errors from auth.api.signInEmail", async () => {
    const error = new Error("Invalid credentials");
    (auth.api.signInEmail as any).mockRejectedValueOnce(error);

    await expect(loginUser(email, password)).rejects.toThrow("Invalid credentials");
  });

  //Testa se a função funciona com diferentes emails e senhas 
  it("should work with different emails and passwords", async () => {
    const anotherEmail = "user2@example.com";
    const anotherPassword = "password456";
    const mockResult = { success: true, user: { email: anotherEmail } };
    (auth.api.signInEmail as any).mockResolvedValueOnce(mockResult);

    const result = await loginUser(anotherEmail, anotherPassword);

    expect(result).toBe(mockResult);
  });
});

