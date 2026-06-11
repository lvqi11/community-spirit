$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "Community Spirit preflight"
Write-Host "Root: $Root"
Write-Host ""

Write-Host "Node:"
node --version

Write-Host "npm:"
npm.cmd --version

Write-Host ""
Write-Host "Running project checks..."
npm.cmd run check

Write-Host ""
Write-Host "Checking React demo endpoint if available..."
try {
  $response = Invoke-WebRequest -Uri "http://127.0.0.1:5173/" -UseBasicParsing -TimeoutSec 3
  Write-Host "React demo: HTTP $($response.StatusCode)"
} catch {
  Write-Host "React demo: not running on 5173. Use scripts/start-vite-demo.ps1 to start it."
}

Write-Host ""
Write-Host "Preflight complete."
