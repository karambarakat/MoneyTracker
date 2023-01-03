terraform {
  backend "s3" {
    bucket = "terraform-remote-state-1234"
    key    = "key"
    region = "us-west-2"
  }
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "1.6.1"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "4.48.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.24.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}
