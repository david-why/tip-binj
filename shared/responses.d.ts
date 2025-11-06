interface GetAuthMeResponse {
  user: Pick<DBUser, 'email' | 'name' | 'id'> | null
}
