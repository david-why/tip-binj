import { VerifyCodeSchema } from '~~/shared/schemas'

export default defineEventHandler(async (event) => {
  const { email, code } = await readValidatedBody(
    event,
    VerifyCodeSchema.parseAsync
  )

  const user = await event.context.db.getUserByLoginCode(email, code)

  if (!user) {
    throw createError({
      status: 400,
      message: 'Login code expired or is invalid',
    })
  }

  await event.context.db.clearLoginCode(user.id)
  await event.context.session.update({ userID: user.id })

  return { success: true }
})
