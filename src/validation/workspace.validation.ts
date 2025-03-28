import { z } from 'zod';

export const nameSchema = z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(255);

export const descriptionSchema = z.string().trim().optional()

export const workspaceIdSchema = z
    .string()
    .trim()
    .min(1, { message: "ID do workspace é obrigatório" });

export const createWorkspaceSchema = z.object({
    name: nameSchema,
    description: descriptionSchema,
})


export const updateWorkspaceSchema = z.object({
    name: nameSchema,
    description: descriptionSchema,
})