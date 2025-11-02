import { z } from "zod";

export const idSchema = z.string().uuid('ID inválido');

export const passwordSchema = z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/\d/, "Senha deve conter pelo menos um número");

export const emailSchema = z
    .string()
    .email("Email inválido")
    .transform(str => str.toLowerCase().trim());

export const nameSchema = z
    .string({
      error: (issue) => issue.input === undefined 
    ? "Nome é obrigatório" 
    : "Nome deve ser um texto" 
    })
    .min(1, "Nome não pode estar vazio")
    .max(100, "Nome não pode ter mais de 100 caracteres")
    .trim()
    
export const descSchema = z
    .string({
      error: (issue) => issue.input === undefined 
    ? "Você deve colocar uma descrição" 
    : "Descrição tem que ser um texto" 
    })
    .min(30, "Descrição tem que ter pelo menos 30 caracteres")
    .max(300, "Descrição tem que ter menos de 300 caracteres")
    .trim()

export const precoSchema = z
    .coerce.number()
    .min(1, "O produto deve conter um preço")

export const imgSchema = z
    .string({
      error: (issue) => issue.input === undefined
      ? "Imagem obrigatória" : "hhCampo deve ser um texto com a URL da sua imagem"

    })