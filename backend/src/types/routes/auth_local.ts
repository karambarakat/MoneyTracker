export interface auth_local_register {
  email: string
  password: string
  userName?: string
}

export interface auth_local_login {
  email: string
  password: string
}
