variable "project_name" {
  type    = string
  default = "video-games-platform"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "location" {
  type    = string
  default = "francecentral"
}

variable "app_service_sku" {
  type    = string
  default = "B1"
}

variable "acr_sku" {
  type    = string
  default = "Standard"
}

variable "postgres_admin_username" {
  type    = string
  default = "pgadminuser"
}

variable "postgres_admin_password" {
  type      = string
  sensitive = true
}

variable "postgres_db_name" {
  type    = string
  default = "videogamesdb"
}

variable "postgres_version" {
  type    = string
  default = "16"
}

variable "postgres_sku_name" {
  type    = string
  default = "B_Standard_B1ms"
}

variable "postgres_storage_mb" {
  type    = number
  default = 32768
}

variable "backend_container_image" {
  type    = string
  default = "backend:dev"
}

variable "frontend_container_image" {
  type    = string
  default = "frontend:dev"
}

variable "backend_port" {
  type    = string
  default = "3000"
}

variable "frontend_port" {
  type    = string
  default = "80"
}