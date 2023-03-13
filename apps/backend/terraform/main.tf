
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

variable "do_region" {
  type    = string
  default = "sfo1"
}

resource "digitalocean_database_db" "DB" {
  name       = "backend_mongo_db"
  cluster_id = digitalocean_database_cluster.db.id
}

resource "digitalocean_database_cluster" "db" {
  name = "backend_mondo_db"

  private_network_uuid = digitalocean_vpc.main.id

  engine  = "mongodb"
  version = "6"

  # @see https://docs.digitalocean.com/reference/api/api-reference/#tag/Databases
  size       = "db-s-1vcpu-1gb"
  region     = var.do_region
  node_count = 1
}

resource "digitalocean_vpc" "main" {
  name     = "${terraform.workspace}-vpc"
  region   = var.do_region
  ip_range = "10.10.10.0/24"
}

resource "digitalocean_app" "web" {
  # attach this app to the vpc/db
  spec {
    database {
      cluster_name = digitalocean_database_cluster.db.id
      # cluster_name should be enough
      # production = true
      # name = "mongo-db"
      # engine = "MONGODB"
    }

    name   = terraform.workspace
    region = var.do_region

    dynamic "alert" {
      for_each = ["DEPLOYMENT_FAILED", "DOMAIN_FAILED"]
      content {
        rule = alert.value
      }
    }

    service {
      name = terraform.workspace

      image {
        deploy_on_push {
          enabled = true
        }
        registry_type = "DOCR"
        # todo: make a terrafrom refrence with
        repository = "backend"
        tag        = "latest"
      }

      http_port = var.PORT
      routes {
        path = "/"
      }

      # todo: read from .env.json
      # todo: manage google auth redirect
      dynamic "env" {
        for_each = { for key, value in var.run_env : key => value }
        content {
          key   = env.key
          value = env.value

        }
      }
      instance_count = 1
      # @see https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/app#instance_size_slug
      instance_size_slug = "basic-xxs"
    }
  }
}
