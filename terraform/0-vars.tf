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
variable "aws_account_id" {
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
