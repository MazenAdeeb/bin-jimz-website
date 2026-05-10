variable "project" {
  type    = string
  default = "binjimz"
}

variable "environment" {
  type    = string
  default = "prod"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "domain_name" {
  type        = string
  description = "Apex domain, e.g. binjimz.com"
  default     = "binjimz.com"
}

variable "vpc_cidr" {
  type    = string
  default = "10.20.0.0/16"
}

variable "container_image" {
  type        = string
  description = "ECR image URI:tag to deploy"
  default     = ""
}

variable "container_port" {
  type    = number
  default = 3000
}

variable "task_cpu" {
  type    = number
  default = 512
}

variable "task_memory" {
  type    = number
  default = 1024
}

variable "min_capacity" {
  type    = number
  default = 1
}

variable "max_capacity" {
  type    = number
  default = 4
}

variable "db_instance_class" {
  type    = string
  default = "db.t4g.small"
}

variable "db_allocated_storage" {
  type    = number
  default = 30
}

variable "db_username" {
  type    = string
  default = "binjimz"
}

variable "openai_api_key" {
  type      = string
  sensitive = true
  default   = ""
}

variable "nextauth_secret" {
  type      = string
  sensitive = true
  default   = ""
}
