import { AddInfractionSchema } from '~~/shared/schemas'

export default defineEventHandler(async (event) => {
  if (!event.context.session.data.userID) {
    throw createError({
      status: 401,
    })
  }

  const payload = await readValidatedBody(event, AddInfractionSchema.parseAsync)

  const infraction = await event.context.db.createInfraction(
    payload.teacher_id,
    event.context.session.data.userID,
    payload.type_id,
    payload.location_id,
    payload.notes || null
  )

  return infraction
})
