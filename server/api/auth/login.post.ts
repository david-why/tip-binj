import { LoginSchema } from '~~/shared/schemas'

type SendCodeResponse = { success: true; name: string } | { success: false }

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.loginCodeUrl) {
    throw createError({
      status: 500,
      message: 'Login not configured',
    })
  }

  const payload = await readValidatedBody(event, LoginSchema.parseAsync)

  const user = await event.context.db.getOrCreateUserByEmail(payload.email)

  const code = Math.floor(Math.random() * 900000 + 100000).toString()
  const res = await fetch(config.loginCodeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: payload.email, code }),
  }).then((r) => r.json<SendCodeResponse>())

  if (!res.success) {
    throw createError({
      status: 404,
      message: 'User not found',
    })
  }

  await event.context.db.updateUser(
    user.id,
    code,
    Date.now() + LOGIN_CODE_TIMEOUT_MS,
    res.name
  )

  return { success: true }
})
