import z from 'zod'

const BINJEmail = z
  .email()
  .refine(
    (s) => s.toLowerCase().endsWith('-binj@basischina.com'),
    'Please use your Teams email (@basischina.com)'
  )

export const LoginSchema = z.object({
  email: BINJEmail,
})
export type LoginSchema = z.infer<typeof LoginSchema>

export const VerifyCodeSchema = z.object({
  email: BINJEmail,
  code: z.string(),
})
export type VerifyCodeSchema = z.infer<typeof VerifyCodeSchema>

export const AddTeacherSchema = z.object({
  email: BINJEmail,
})
export type AddTeacherSchema = z.infer<typeof AddTeacherSchema>

export const AddInfractionSchema = z.object({
  teacher_id: z.number(),
})
export type AddInfractionSchema = z.infer<typeof AddInfractionSchema>
