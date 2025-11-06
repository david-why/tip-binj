export default defineEventHandler(async (event) => {
  return (await event.context.db.getInfractions()) satisfies GetInfractionResult[]
})
