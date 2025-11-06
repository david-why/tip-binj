import { AddTeacherSchema } from '~~/shared/schemas'

type GetNameResponse = { success: true; name: string } | { success: false }

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const { email } = await readValidatedBody(event, AddTeacherSchema.parseAsync)

  let name: string | null = null
  try {
    const res = await fetch(config.getNameUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((r) => r.json<GetNameResponse>())
    if (res.success) {
      name = res.name
    }
  } catch (e) {
    console.error('Failed to get name for user', e)
    throw createError({
      status: 500,
      message: 'Failed to get name for user',
    })
  }

  if (name === null) {
    throw createError({
      status: 404,
      message: 'User with the given email is not found',
    })
  }

  const teacher = await event.context.db.createOrUpdateTeacher(email, name)

  return teacher
})
