export default defineEventHandler(async (event) => {
  const infractionID = parseInt(getRouterParam(event, 'infraction')!)
  if (isNaN(infractionID)) {
    throw createError({
      status: 404,
    })
  }

  const infraction = await event.context.db.getInfractionByID(infractionID)

  return infraction
})
