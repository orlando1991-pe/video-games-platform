resource "random_string" "suffix" {
  length  = 5
  upper   = false
  special = false
}

locals {
  suffix = random_string.suffix.result

  rg_name           = "rg-${var.project_name}-${var.environment}"
  plan_name         = "asp-${var.project_name}-${var.environment}"
  acr_name          = "acr${replace(var.project_name, "-", "")}${var.environment}${local.suffix}"
  frontend_app_name = "app-${var.project_name}-web-${var.environment}-${local.suffix}"
  backend_app_name  = "app-${var.project_name}-api-${var.environment}-${local.suffix}"
  postgres_name     = "psql-${var.project_name}-${var.environment}-${local.suffix}"
}

resource "azurerm_resource_group" "rg" {
  name     = local.rg_name
  location = var.location
}

resource "azurerm_container_registry" "acr" {
  name                = local.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.acr_sku
  admin_enabled       = false
}

resource "azurerm_service_plan" "plan" {
  name                = local.plan_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku
}

resource "azurerm_postgresql_flexible_server" "postgres" {
  name                   = local.postgres_name
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  version                = var.postgres_version
  administrator_login    = var.postgres_admin_username
  administrator_password = var.postgres_admin_password

  sku_name   = var.postgres_sku_name
  storage_mb = var.postgres_storage_mb
  zone       = "1"

  backup_retention_days         = 7
  public_network_access_enabled = true

  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_postgresql_flexible_server_database" "db" {
  name      = var.postgres_db_name
  server_id = azurerm_postgresql_flexible_server.postgres.id
  collation = "en_US.utf8"
  charset   = "UTF8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "AllowAzureServices"
  server_id        = azurerm_postgresql_flexible_server.postgres.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

resource "azurerm_linux_web_app" "backend" {
  name                = local.backend_app_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  https_only = true

  identity {
    type = "SystemAssigned"
  }

  site_config {
    always_on                               = true
    health_check_path                       = "/health"
    health_check_eviction_time_in_min       = 2
    container_registry_use_managed_identity = true

    application_stack {
      docker_image_name   = var.backend_container_image
      docker_registry_url = "https://${azurerm_container_registry.acr.login_server}"
    }
  }

  app_settings = {
    WEBSITES_PORT = var.backend_port
    PORT          = var.backend_port
    NODE_ENV      = "production"

    DB_HOST     = azurerm_postgresql_flexible_server.postgres.fqdn
    DB_PORT     = "5432"
    DB_NAME     = azurerm_postgresql_flexible_server_database.db.name
    DB_USER     = var.postgres_admin_username
    DB_PASSWORD = var.postgres_admin_password
    DB_SSL      = "true"

    CORS_ORIGIN = "https://${local.frontend_app_name}.azurewebsites.net"
  }
}

resource "azurerm_linux_web_app" "frontend" {
  name                = local.frontend_app_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  https_only = true

  identity {
    type = "SystemAssigned"
  }

  site_config {
    always_on                               = true
    container_registry_use_managed_identity = true

    application_stack {
      docker_image_name   = var.frontend_container_image
      docker_registry_url = "https://${azurerm_container_registry.acr.login_server}"
    }
  }

  app_settings = {
    WEBSITES_PORT = var.frontend_port
  }
}

resource "azurerm_role_assignment" "backend_acrpull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_web_app.backend.identity[0].principal_id
}

resource "azurerm_role_assignment" "frontend_acrpull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_web_app.frontend.identity[0].principal_id
}