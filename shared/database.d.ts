interface DBUser {
  id: number
  email: string
  name: string | null
  login_code: string | null
  login_expires: number | null
}

interface DBTeacher {
  id: number
  email: string
  name: string | null
}

interface DBInfraction {
  id: number
  user_id: number
  teacher_id: number
  type_id: number
  location_id: number
  notes: string | null
  created_at: number
}
