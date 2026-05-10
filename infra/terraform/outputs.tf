output "alb_dns_name" {
  value       = aws_lb.alb.dns_name
  description = "ALB DNS"
}

output "cloudfront_domain" {
  value       = aws_cloudfront_distribution.web.domain_name
  description = "CloudFront distribution domain"
}

output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}

output "rds_endpoint" {
  value     = aws_db_instance.postgres.address
  sensitive = true
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.admin.id
}

output "cognito_client_id" {
  value     = aws_cognito_user_pool_client.admin.id
  sensitive = true
}

output "cognito_issuer" {
  value = "https://cognito-idp.${var.aws_region}.amazonaws.com/${aws_cognito_user_pool.admin.id}"
}

output "media_bucket" {
  value = aws_s3_bucket.media.bucket
}

output "uploads_bucket" {
  value = aws_s3_bucket.uploads.bucket
}

output "name_servers" {
  value       = aws_route53_zone.main.name_servers
  description = "Set these at your domain registrar"
}
