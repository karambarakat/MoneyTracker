variable "run_env" {
  type = map(object({
    NODE_ENV   = string
    SALT       = string
    JWT_SECRET = string

    MONGO_PORT   = number
    MONGO_USER   = string
    MONGO_PASS   = string
    MONGO_STRING = string

    GOOGLE_CLIENT_ID     = string
    GOOGLE_CLIENT_SECRET = string

    GOOGLE_CLIENT_CALLBACK_URL_BACKEND          = string
    GOOGLE_CLIENT_CALLBACK_URL_FRONTEND         = string
    GOOGLE_CLIENT_CALLBACK_URL_FRONTEND_FAILURE = string
  }))
  sensitive = true
}

variable "PORT" {
  type    = number
  default = 8080
}



