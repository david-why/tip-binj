interface GetInfractionResult {
  id: number
  user_id: number
  user_email: string
  user_name: string | null
  teacher_id: number
  teacher_email: string
  teacher_name: string | null
  type_id: number
  type_name: string
  type_description: string | null
  location_id: number
  location_name: string
  location_description: string | null
  notes: string | null
  created_at: number
}

interface GetTagsResult {
  types: DBType[]
  locations: DBLocation[]
}

interface GetSingleTeacherResult extends DBTeacher {
  infractions: GetInfractionResult[]
}
