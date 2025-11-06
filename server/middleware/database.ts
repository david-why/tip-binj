export default defineEventHandler(async (event) => {
  const d1 = event.context.cloudflare.env.DB
  event.context.db = new Database(d1)
})

declare module 'h3' {
  interface H3EventContext {
    db: Database
  }
}

class Database {
  constructor(public db: D1Database) {}

  async getOrCreateUserByEmail(email: string) {
    const user = await this.db
      .prepare(
        'INSERT INTO users(email) VALUES(?) ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING *'
      )
      .bind(email.toLowerCase())
      .first<DBUser>()
    return user as DBUser
  }

  async addLoginCode(userID: number, code: string, expires: number) {
    const result = await this.db
      .prepare(
        'UPDATE users SET login_code = ?, login_expires = ? WHERE id = ?'
      )
      .bind(code, expires, userID)
      .run()
    if (!result.meta.changed_db) {
      throw new Error('No user found with the given ID')
    }
  }

  async getUserByLoginCode(code: string) {
    const now = Date.now()
    const user = await this.db
      .prepare('SELECT * FROM users WHERE login_code = ? AND login_expires > ?')
      .bind(code, now)
      .first<DBUser>()
    return user
  }
}
