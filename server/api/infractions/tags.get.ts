// tags = types & locations

export default defineEventHandler(async (event) => {
  const types = await event.context.db.getTypes()
  const locations = await event.context.db.getLocations()

  return { types, locations }
})
