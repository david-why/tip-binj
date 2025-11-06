export default defineEventHandler(async (event) => {
  const userID = event.context.session.data.userID

  if (!userID) {
    return { user: null } satisfies GetAuthMeResponse
  }

  const user = await event.context.db.getUserByID(userID)

  return {
    user: { id: user.id, name: user.name, email: user.email },
  } satisfies GetAuthMeResponse
})
