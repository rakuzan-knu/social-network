# Cloudflare Free Tier DNS & CNAME Proxy Configuration ($0/mo)

# Free DNS Record pointing to Render Backend
resource "cloudflare_record" "backend_cname" {
  count   = var.cloudflare_api_token != "dummy_cloudflare_token" && var.cloudflare_api_token != "dummy_token" && var.cloudflare_api_token != "" && var.cloudflare_zone_id != "dummy_zone_id" && var.cloudflare_zone_id != "" ? 1 : 0
  zone_id = var.cloudflare_zone_id
  name    = "api"
  value   = "social-network-backend.onrender.com"
  type    = "CNAME"
  proxied = true # Free Cloudflare Proxy (DDoS Protection + Free SSL/TLS)
  ttl     = 1    # Auto TTL
}

# Free DNS Record pointing to Vercel Frontend
resource "cloudflare_record" "frontend_cname" {
  count   = var.cloudflare_api_token != "dummy_cloudflare_token" && var.cloudflare_api_token != "dummy_token" && var.cloudflare_api_token != "" && var.cloudflare_zone_id != "dummy_zone_id" && var.cloudflare_zone_id != "" ? 1 : 0
  zone_id = var.cloudflare_zone_id
  name    = "@"
  value   = "cname.vercel-dns.com"
  type    = "CNAME"
  proxied = true
  ttl     = 1
}
