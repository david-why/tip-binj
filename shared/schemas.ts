import z from 'zod'

export const LoginSchema = z.object({
  email: z
    .email()
    .refine(
      (s) => s.toLowerCase().endsWith('-binj@basischina.com'),
      'Please use your Teams email (@basischina.com)'
    ),
})
export type LoginSchema = z.infer<typeof LoginSchema>
