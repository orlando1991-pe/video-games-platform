output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "frontend_url" {
  value = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "backend_url" {
  value = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "postgres_fqdn" {
  value = azurerm_postgresql_flexible_server.postgres.fqdn
}

output "postgres_db_name" {
  value = azurerm_postgresql_flexible_server_database.db.name
}