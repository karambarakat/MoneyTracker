
###
###
### variables
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

###
###
### provider
provider "mongodbatlas" {
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

###
###
### resources
resource "mongodbatlas_cluster" "mongo_cluster" {
  project_id                  = var.atlas_project_id
  name                        = "${var.app_name}-${terraform.workspace}"
  provider_instance_size_name = "M0"
  provider_name               = "TENANT"
  backing_provider_name       = "AWS"
  provider_region_name        = "US_WEST_2"


  cluster_type = "REPLICASET"
  replication_specs {
    num_shards = 1
    regions_config {
      region_name     = "US_WEST_2"
      electable_nodes = 3
      priority        = 7
      read_only_nodes = 0
    }
  }
}

resource "mongodbatlas_database_user" "mongo_user" {
  username           = "mypocket-terraform-user-${terraform.workspace}"
  password           = var.atlas_user_password
  project_id         = var.atlas_project_id
  auth_database_name = "admin"

  roles {
    role_name     = "readWrite"
    database_name = "mypocket"
  }
}

# use vpc peering instead
# resource "mongodbatlas_project_ip_whitelist" "test" {
#   project_id = var.atlas_project_id
#   ip_address = aws_vpc.main.
# }

resource "mongodbatlas_network_container" "main" {
  project_id       = var.atlas_project_id
  atlas_cidr_block = "10.8.0.0/21"
  provider_name    = "AWS"
  region_name      = "US_WEST_2"
}

resource "mongodbatlas_network_peering" "main" {
  accepter_region_name   = "US_WEST_2"
  project_id             = var.atlas_project_id
  container_id           = mongodbatlas_network_container.main.id
  provider_name          = "AWS"
  route_table_cidr_block = "192.168.0.0/24"
  vpc_id                 = aws_vpc.main.id
  aws_account_id         = var.aws_account_id
}

resource "aws_vpc_peering_connection_accepter" "peer" {
  vpc_peering_connection_id = mongodbatlas_network_peering.main.connection_id


  auto_accept = true

  tags = {
    "Name" = "mongodb_request_peering"
  }
}

output "atlas_connection_strings" {
  value = mongodbatlas_cluster.mongo_cluster.connection_strings[0].standard_srv
}
output "mongodbatlas_database_user" {
  value = mongodbatlas_database_user.mongo_user.username
}

