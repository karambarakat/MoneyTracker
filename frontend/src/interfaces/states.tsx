export interface UserState {
  provider: 'google' | 'email' | 'offline' | undefined
  profile:
    | {
        userName: string
        email: string
      }
    | undefined
  token: string | undefined
}
