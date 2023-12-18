export const BACKEND = 'http://localhost:4200'
export const FRONTEND = 'http://localhost:4201'
export const HELPER = 'http://locahost:4202'

export const HELPER_CLEAN_DB = 'http://locahost:4202/clean_db'
export const HELPER_CLEAN_USER = (user: string) =>
  'http://locahost:4202/remove_user_data/' + user
