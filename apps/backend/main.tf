terraform {
  cloud {
    organization = "myPocket"

    workspaces {
      name = "myPocket_backend"
    }
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.55.0"
    }
  }
}

provider "google" {
  project = "mypocket-379109"
  region  = "us-central1"
}
