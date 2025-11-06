import { AddTeacherSchema } from '~~/shared/schemas'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, AddTeacherSchema.parseAsync)

  // TODO: fetch name
  const teacher = await event.context.db.createOrUpdateTeacher(email, null)

  return teacher
})
