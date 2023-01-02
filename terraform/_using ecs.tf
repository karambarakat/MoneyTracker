# build an image from ../backend/docker file with name of
/* same as running
docker tag mypocket_images:latest path.to.ecr.amazonaws.com/mypocket_images:latest
docker push path.to.ecr.amazonaws.com/mypocket_images:latest
*/
# resource "docker_registry_image" "api_backend_image" {
#   name = "${aws_ecr_repository.mypocket_ecr_repository.repository_url}:${var.app_version}"
#   build {
#     context = "../backend"
#   }
# }


# resource "aws_ecs_cluster" "main_cluster" {
#   name = "${local.project_name}-main-cluster"

#   tags = {
#     "Name"    = "${local.project_name}-main-cluster"
#     "Context" = "${local.project_name}"
#   }
# }

# resource "aws_ecs_cluster_capacity_providers" "provider" {
#   cluster_name = aws_ecs_cluster.main_cluster.name

#   capacity_providers = ["FARGATE"]

#   default_capacity_provider_strategy {
#     base              = 1
#     weight            = 100
#     capacity_provider = "FARGATE"
#   }
# }

# resource "aws_ecs_task_definition" "backend" {
#   family                   = "${local.project_name}-backend-task"
#   requires_compatibilities = ["FARGATE"]
#   network_mode             = "bridge"

#   cpu    = 1024
#   memory = 2048

#   container_definitions = jsonencode([
#     {
#       name      = "api_backend"
#       image     = "${docker_registry_image.api_backend_image.id}"
#       cpu       = 1024
#       memory    = 2048
#       essential = true
#       portMappings = [
#         {
#           containerPort = 80
#           hostPort      = 80
#         }
#       ]
#     }
#   ])



#   tags = {
#     "Name"    = "${local.project_name}-backend-task"
#     "Context" = "${local.project_name}"
#   }
# }

# resource "aws_ecs_service" "backend" {
#   name            = "${local.project_name}-backend-service"
#   cluster         = aws_ecs_cluster.main_cluster.id
#   task_definition = aws_ecs_task_definition.backend.arn
#   desired_count   = 1
#   network_configuration {
#     subnets          = [aws_subnet.main.id]
#     security_groups  = [aws_security_group.main.id]
#     assign_public_ip = true
#   }
#   tags = {
#     "Name"    = "${local.project_name}-backend-service"
#     "Context" = "${local.project_name}"
#   }
# }


