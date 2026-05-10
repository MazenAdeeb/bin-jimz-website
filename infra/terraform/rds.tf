resource "random_password" "db" {
  length  = 24
  special = true
  override_special = "_-+="
}

resource "aws_db_subnet_group" "main" {
  name       = "${local.name}-db-subnets"
  subnet_ids = [for s in aws_subnet.private : s.id]
  tags       = { Name = "${local.name}-db-subnets" }
}

resource "aws_db_parameter_group" "pg16" {
  name        = "${local.name}-pg16"
  family      = "postgres16"
  description = "Bin Jimz Postgres 16 with pgvector"

  parameter {
    name         = "shared_preload_libraries"
    value        = "pgvector"
    apply_method = "pending-reboot"
  }
}

resource "aws_db_instance" "postgres" {
  identifier              = "${local.name}-pg"
  engine                  = "postgres"
  engine_version          = "16.4"
  instance_class          = var.db_instance_class
  allocated_storage       = var.db_allocated_storage
  storage_type            = "gp3"
  storage_encrypted       = true

  db_name                 = "binjimz"
  username                = var.db_username
  password                = random_password.db.result

  multi_az                = true
  publicly_accessible     = false
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.rds.id]
  parameter_group_name    = aws_db_parameter_group.pg16.name

  backup_retention_period = 7
  delete_automated_backups = true
  deletion_protection     = true
  skip_final_snapshot     = false
  final_snapshot_identifier = "${local.name}-pg-final"

  performance_insights_enabled = true
  monitoring_interval          = 60

  tags = { Name = "${local.name}-pg" }
}

resource "aws_secretsmanager_secret" "db" {
  name = "${local.name}/db"
}

resource "aws_secretsmanager_secret_version" "db" {
  secret_id = aws_secretsmanager_secret.db.id
  secret_string = jsonencode({
    username = var.db_username
    password = random_password.db.result
    host     = aws_db_instance.postgres.address
    port     = aws_db_instance.postgres.port
    database = "binjimz"
    url      = "postgresql://${var.db_username}:${random_password.db.result}@${aws_db_instance.postgres.address}:${aws_db_instance.postgres.port}/binjimz?schema=public"
  })
}
