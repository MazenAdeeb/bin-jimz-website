resource "aws_sesv2_email_identity" "domain" {
  email_identity = local.domain
}

resource "aws_sesv2_email_identity" "no_reply" {
  email_identity = "no-reply@${local.domain}"
}
