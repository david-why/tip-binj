export default defineEventHandler(async (event) => {
  console.log(event.context.cloudflare)

  return {}
})
