terraform {
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "3.4.3"
    }
  }
}

resource "random_integer" "main" {
  min = 1
  max = 50000
}

output "hello_world" {
  value = "${random_integer.main.result}-hello world"
}
