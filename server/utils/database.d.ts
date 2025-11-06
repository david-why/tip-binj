declare interface DBUser {
  id: number
  email: string
  login_code: string | null
  login_expires: number | null
}
