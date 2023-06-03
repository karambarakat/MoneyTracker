export interface email_status {
  email: string
}

export interface profile_update {
  displayName?: string
  picture?: string
}

export interface updatePassword_nolocal {
  newPassword: string
}

export interface updatePassword_local {
  oldPassword: string
  newPassword: string
}
