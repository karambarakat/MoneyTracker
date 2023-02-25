/**
  general
*/
variable "app_name" {
  type = string
}

variable "app_version" {
  # follow `\d(.\d)*` regex. example 2.3
  description = "app version (ex: 1.1), important for uploading NEW image to the repo, otherwise terraform gonna use old version of app"
  type        = string
}

locals {
  project_name = "${var.app_name}-terraform-${terraform.workspace}"
}



/**
  database
*/
variable "mongodbatlas_public_key" {
  type = string
}

variable "mongodbatlas_private_key" {
  type = string
}

variable "atlas_project_id" {
  type = string
}

variable "atlas_user_password" {
  type = string
}

/**
  google oauth integration
*/
variable "GOOGLE_CLIENT_ID" {
  type = string
}
variable "GOOGLE_CLIENT_SECRET" {
  type = string
}

variable "GOOGLE_CLIENT_CALLBACK_URL_BACKEND" {
  type = string
}
variable "GOOGLE_CLIENT_CALLBACK_URL_FRONTEND" {
  type = string
}
variable "GOOGLE_CLIENT_CALLBACK_URL_FRONTEND_FAILURE" {
  type = string
}


/**
  aws (backend-rest-api)
*/
variable "aws_access_key" {
  type = string
}
variable "aws_secret_key" {
  type = string
}
variable "aws_region" {
  type = string
}
variable "aws_region_camel" {
  type = string
}
variable "aws_account_id" {
  type = string
}



/**
  frontend
*/
variable "vercel_api_token" {
  type = string
}



/**
  from /backend/.env
*/
variable "SALT" {
  type = string
}
variable "JWT_SECRET" {
  type = string
}
