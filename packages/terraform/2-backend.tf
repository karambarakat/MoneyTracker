
/**
  app immage
*/
resource "aws_ecr_repository" "main" {
  name                 = "${local.project_name}-repository"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    "Name"    = "${local.project_name}-repository"
    "Context" = "${local.project_name}"
  }
}

# build and push
resource "docker_registry_image" "api_backend_image" {
  name = "${aws_ecr_repository.main.repository_url}:${var.app_version}"
  build {
    context = "../backend"
  }
}

/**
  access permistion for AWS service to access AWS ECR 
*/
resource "aws_iam_role_policy" "acessECR" {
  name = "acess_ECR_policy"
  role = aws_iam_role.acessECR.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        "Action" : [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:DescribeImages",
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability"
        ],
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role" "acessECR" {
  name = "acess_ECR_for_app_runner"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "build.apprunner.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    "Name"    = "${local.project_name}-apprunner-rule"
    "Context" = "${local.project_name}"
  }
}


/**
  app runner
*/
resource "aws_apprunner_service" "backend_api" {
  service_name = "${local.project_name}-backend-api"

  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.acessECR.arn
    }

    image_repository {
      image_configuration {
        port = "8000"
        runtime_environment_variables = {
          "PORT"         = "8000",
          "MONGO_STRING" = "${replace(mongodbatlas_cluster.main.srv_address, "mongodb+srv://", "mongodb+srv://${mongodbatlas_database_user.main.username}:${var.atlas_user_password}@")}/main"

          # todo better env loading
          "JWT_SECRET" = var.JWT_SECRET,
          "SALT"       = var.SALT,

          "GOOGLE_CLIENT_ID"     = var.GOOGLE_CLIENT_ID,
          "GOOGLE_CLIENT_SECRET" = var.GOOGLE_CLIENT_SECRET,

          "GOOGLE_CLIENT_CALLBACK_URL_BACKEND"          = var.GOOGLE_CLIENT_CALLBACK_URL_BACKEND,
          "GOOGLE_CLIENT_CALLBACK_URL_FRONTEND"         = var.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND,
          "GOOGLE_CLIENT_CALLBACK_URL_FRONTEND_FAILURE" = var.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND_FAILURE,

          # todo google oauth var
        }
      }
      image_identifier      = docker_registry_image.api_backend_image.name
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = false
  }

  instance_configuration {
    cpu    = 1024
    memory = 2048
  }


  network_configuration {
    ingress_configuration {
      is_publicly_accessible = true
    }
    egress_configuration {
      egress_type = "DEFAULT"
    }
  }

  tags = {
    "Name"    = "${local.project_name}-apprunner"
    "Context" = "${local.project_name}"
  }
}

output "backend_service_url" {
  value = aws_apprunner_service.backend_api.service_url
}

