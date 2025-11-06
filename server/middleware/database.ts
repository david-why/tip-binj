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

  // user

  async getOrCreateUserByEmail(email: string) {
    const user = await this.db
      .prepare(
        'INSERT INTO users(email) VALUES(?) ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING *'
      )
      .bind(email.toLowerCase())
      .first<DBUser>()
    return user as DBUser
  }

  async updateUser(userID: number, code: string, expires: number, name: string) {
    const result = await this.db
      .prepare(
        'UPDATE users SET login_code = ?, login_expires = ?, name = ? WHERE id = ?'
      )
      .bind(code, expires, name, userID)
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

  // infractions

  async getInfractions(count: number = 20) {
    count = Math.min(count, 50)
    const infractions = await this.db
      .prepare(
        `
SELECT
    infractions.id,
    users.email AS user_email,
    users.name AS user_name,
    teachers.email AS teacher_email,
    teachers.name AS teacher_name,
    types.name AS type_name,
    types.description AS type_description,
    locations.name AS location_name,
    locations.description AS location_description,
    infractions.notes,
    infractions.created_at
FROM infractions
JOIN users ON infractions.user_id = users.id
JOIN teachers ON infractions.teacher_id = teachers.id
JOIN types ON infractions.type_id = types.id
JOIN locations ON infractions.location_id = locations.id
ORDER BY infractions.created_at DESC
LIMIT ?;
`
      )
      .bind(count)
      .all<GetInfractionResult>()
    return infractions.results
  }
}
