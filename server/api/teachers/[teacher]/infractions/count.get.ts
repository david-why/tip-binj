export default defineEventHandler(async (event) => {
  const teacherID = parseInt(getRouterParam(event, 'teacher')!)
  if (isNaN(teacherID)) {
    throw createError({
      status: 404,
    })
  }

  const count = await event.context.db.getInfractionCountForTeacher(teacherID)

  return { count }
})
