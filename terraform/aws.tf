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

provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "mongodb-atlas-vpc"
  }
}


