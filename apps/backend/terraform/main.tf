variable "vo_token" {
  type = string
}

terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.26.0"
    }
  }
}

variable "do_token" {}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_vpc" "main" {
  name     = "${terrform.workspace}-vpc"
  region   = "sfo1"
  ip_range = "10.10.10.0/24"
}
