param(
  [int]$Port = 4177
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "Starting Community Spirit static demo on port $Port..."
Write-Host "Open: http://127.0.0.1:$Port/demo/web/index.html"
Write-Host ""
Write-Host "Press Ctrl+C to stop."

python -m http.server $Port
