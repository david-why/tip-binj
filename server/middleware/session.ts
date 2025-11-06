import type { SessionManager } from 'h3'

declare module 'h3' {
  interface H3EventContext {
    session: SessionManager<SessionData>
  }
}

interface SessionData {
  userID?: number
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const session = await useSession<SessionData>(event, {
    password: config.secretKey,
    cookie: {
      secure: false,
      maxAge: COOKIE_MAXAGE_S,
    },
  })
  event.context.session = session
})
