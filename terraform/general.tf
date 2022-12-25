variable "app_name" {
  type = string
}

terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "1.6.1"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "4.48.0"
    }
  }
}
