interface GetInfractionResult {
  id: number
  user_email: string
  user_name: string | null
  teacher_email: string
  teacher_name: string | null
  type_name: string
  type_description: string | null
  location_name: string
  location_description: string | null
  notes: string | null
  created_at: number
}
