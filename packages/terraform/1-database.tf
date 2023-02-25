resource "mongodbatlas_cluster" "main" {
  project_id                  = var.atlas_project_id
  name                        = "${local.project_name}-cluster"
  provider_instance_size_name = "M0"

  provider_name         = "TENANT"
  backing_provider_name = "AWS"
  provider_region_name  = var.aws_region_camel


  cluster_type = "REPLICASET"
  replication_specs {
    num_shards = 1
    regions_config {
      region_name     = var.aws_region_camel
      electable_nodes = 3
      priority        = 7
      read_only_nodes = 0
    }
  }
}

resource "mongodbatlas_database_user" "main" {
  username           = "${local.project_name}-user"
  password           = var.atlas_user_password
  project_id         = var.atlas_project_id
  auth_database_name = "admin"

  roles {
    role_name     = "readWrite"
    database_name = "main"
  }
}

resource "mongodbatlas_network_container" "main" {
  project_id       = var.atlas_project_id
  atlas_cidr_block = "10.8.0.0/21"
  provider_name    = "AWS"
  region_name      = var.aws_region_camel
}

# assuming existing aws project
resource "mongodbatlas_network_peering" "main" {
  accepter_region_name   = var.aws_region_camel
  project_id             = var.atlas_project_id
  container_id           = mongodbatlas_network_container.main.id
  provider_name          = "AWS"
  route_table_cidr_block = "192.168.0.0/24"
  vpc_id                 = aws_vpc.main.id
  aws_account_id         = var.aws_account_id
  resource_group_name    = "${local.project_name}-peering"
}

resource "aws_vpc_peering_connection_accepter" "peer" {
  vpc_peering_connection_id = mongodbatlas_network_peering.main.connection_id

  auto_accept = true

  tags = {
    "Name"    = "${local.project_name}-mongodb_request_peering"
    "Context" = "${local.project_name}"
  }
}

###
###
### output
output "atlas_connection_strings" {
  value = mongodbatlas_cluster.main.connection_strings[0].standard_srv
}
output "mongodbatlas_database_user" {
  value = mongodbatlas_database_user.main.username
}
