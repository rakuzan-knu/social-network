variable "vercel_api_token" {
  type        = string
  description = "Vercel API Token"
  sensitive   = true
}

variable "app_name" {
  type        = string
  description = "Application Name"
  default     = "social-network"
}

variable "github_repository" {
  type        = string
  description = "GitHub Repository (owner/repo)"
  default     = "rakuzan-knu/social-network"
}

variable "api_url" {
  type        = string
  description = "Production Backend API URL"
  default     = "https://social-network-api.onrender.com/api"
}
