terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.55.0"
    }
  }
}

variable "GOOGLE_CREDENTIALS" {
  type      = string
  sensitive = true
}

provider "google" {
  project = "mypocket-379109"
  region  = "us-central1"

  credentials = var.GOOGLE_CREDENTIALS
}

resource "google_storage_bucket" "main" {
  name     = "development-mypocket"
  location = "us-central1"
}

resource "google_storage_bucket_object" "main" {
  name   = "${terraform.workspace}-function"
  source = "../src.zip"
  bucket = google_storage_bucket.main.name
}

resource "google_cloudfunctions_function" "main" {
  name        = "terraform.workspace-function"
  description = "My function"
  runtime     = "nodejs18"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.main.name
  source_archive_object = google_storage_bucket_object.main.name
  trigger_http          = true
  entry_point           = "helloGET"
}

resource "google_cloudfunctions_function_iam_member" "main" {
  project        = google_cloudfunctions_function.main.project
  region         = google_cloudfunctions_function.main.region
  cloud_function = google_cloudfunctions_function.main.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
