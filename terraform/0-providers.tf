/**
  database
*/
provider "mongodbatlas" {
  # DEVELOPER TODO: there is access list associated with this public and private key
  # if the ip address of the terraform context changes you have to manually add the ip address
  # I can't use `mongodbatlas_project_ip_access_list`, the access list is on the key level
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

/**
  aws (backend-rest-api)
*/
provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region
}

# todo: add option to push images from remote server
# this current setup depends on local docker engine
locals {
  /**
    this provider works by connecting to docker context
    and relying on it to excecute resources
    usually it is the docker daemon running in this machine
    you can get this value by running `docker context list`
    and copying one of `DOCKER_ENDPOINT` there
  */
  docker_daemon_host = "npipe:////./pipe/docker_engine"
}

data "aws_caller_identity" "this" {}
# this line of code will do the same as 
# aws ecr get-login-password --region <region>
# @see https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-authenticate-registry
data "aws_ecr_authorization_token" "temporary" {
  registry_id = data.aws_caller_identity.this.account_id
}


provider "docker" {
  host = local.docker_daemon_host

  registry_auth {
    # here we define a repositary we push the images when we run 
    # in our case it is `aws ecr`
    address  = "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
    username = data.aws_ecr_authorization_token.temporary.user_name
    password = data.aws_ecr_authorization_token.temporary.password
  }
}
