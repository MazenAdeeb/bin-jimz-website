resource "aws_cognito_user_pool" "admin" {
  name                     = "${local.name}-admin"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 12
    require_uppercase = true
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  mfa_configuration = "OPTIONAL"

  software_token_mfa_configuration {
    enabled = true
  }
}

resource "aws_cognito_user_pool_client" "admin" {
  name                                 = "${local.name}-admin-client"
  user_pool_id                         = aws_cognito_user_pool.admin.id
  generate_secret                      = true
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["openid", "email", "profile"]
  callback_urls = [
    "https://${local.www_domain}/api/auth/callback/cognito",
    "https://${local.domain}/api/auth/callback/cognito",
  ]
  logout_urls = [
    "https://${local.www_domain}/admin/login",
  ]
  supported_identity_providers = ["COGNITO"]
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
  ]
}

resource "aws_cognito_user_pool_domain" "admin" {
  domain       = "${local.name}-admin"
  user_pool_id = aws_cognito_user_pool.admin.id
}
