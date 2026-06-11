param(
  [int]$Port = 5173
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing npm dependencies..."
  npm.cmd install
}

Write-Host "Starting Community Spirit React/Vite demo on port $Port..."
Write-Host "Open: http://127.0.0.1:$Port/"
Write-Host ""
Write-Host "Press Ctrl+C to stop."

npm.cmd run dev -- --port $Port
