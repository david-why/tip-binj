export default defineEventHandler(async (event) => {
  await event.context.session.update({ userID: undefined })

  return { success: true }
})
