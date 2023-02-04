dev-frontend:
	npm run dev --prefix frontend
dev-backend:
	npm run dev  --prefix backend
dev:
	concurrently "make dev-frontend" "make dev-backend"
compose:
	docker compose up
schema:
	cp schema.d.ts backend/schema.d.ts && cp schema.d.ts frontend/schema.d.ts
terraform-init:
	terraform -chdir=terraform init
terraform-plan:
	terraform -chdir=terraform plan -var-file=secrets.tfvars
terraform-apply:
	terraform -chdir=terraform apply -var-file=secrets.tfvars -auto-approve
terraform-destroy:
	terraform -chdir=terraform destroy -var-file=secrets.tfvars
terraform:
	terraform -chdir=terraform