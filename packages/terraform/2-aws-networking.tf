resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name      = "${local.project_name}-main-vpc"
    "Context" = "${local.project_name}"

  }
}

resource "aws_subnet" "main" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name      = "${local.project_name}-main-subnet"
    "Context" = "${local.project_name}"
  }
}

resource "aws_security_group" "inbound" {
  name        = "${local.project_name}-inbound-security-group"
  description = "allow ingoing http and https"
  vpc_id      = aws_vpc.main.id

  ingress {
    description      = "https"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  ingress {
    description      = "http"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name      = "${local.project_name}-inbound-security-group"
    "Context" = "${local.project_name}"
  }

}

resource "aws_security_group" "outbound" {
  name        = "${local.project_name}-outbound-security-group"
  description = "allow any outbound connection"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name      = "${local.project_name}-outbound-security-group"
    "Context" = "${local.project_name}"
  }

}
