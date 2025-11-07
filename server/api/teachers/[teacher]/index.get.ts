export default defineEventHandler(async (event) => {
  const teacherID = parseInt(getRouterParam(event, 'teacher')!)
  if (isNaN(teacherID)) {
    throw createError({
      status: 404,
    })
  }

  const teacher = await event.context.db.getTeacherByID(teacherID)
  const infractions = await event.context.db.getInfractionsForTeacher(teacherID)

  return { ...teacher, infractions }
})
