/**
resource "vercel_project" "main" {
  name      = "${local.project_name}-frontend"
  framework = "vite"
  git_repository = {
    type = "github"
    repo = "karambarakat/nextjs-terraform-demo"
  }

  environment = [
    {
      key   = "VITE_BACKEND_URL",
      value = aws_apprunner_service.backend_api.service_url,
      target : ["production", "development", "preview"]
    },
    {
      key   = "VITE_BACKEND_API",
      value = "${aws_apprunner_service.backend_api.service_url}/api/v1",
      target : ["production", "development", "preview"]
    }
  ]
}

resource "vercel_project_domain" "main" {
  project_id = vercel_project.main.id
  domain     = "mypocket.karam.one"
}
*/
