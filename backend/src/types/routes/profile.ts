export interface email_status {
  email: string
}

export interface profile_update {
  userName?: string
  picture?: string
}

export interface updatePassword_nolocal {
  newPassword: string
}
export interface updatePassword_local {
  oldPassword: string
  newPassword: string
}
