terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.70"
    }
  }
  backend "s3" {
    # Configure remote state per environment, e.g.:
    # bucket = "binjimz-tfstate"
    # key    = "prod/terraform.tfstate"
    # region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "Bin Jimz"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# CloudFront/ACM cert must live in us-east-1 regardless of primary region
provider "aws" {
  alias  = "use1"
  region = "us-east-1"
}

data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  name        = "${var.project}-${var.environment}"
  azs         = slice(data.aws_availability_zones.available.names, 0, 2)
  domain      = var.domain_name
  www_domain  = "www.${var.domain_name}"
}
