# PowerShell Build Script for Engineering Calculator
# اسکریپت ساخت ماشین حساب مهندسی

$Host.UI.RawUI.WindowTitle = "Building Engineering Calculator"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     ماشین حساب مهندسی پیشرفته - ساخت نسخه ویندوز          ║" -ForegroundColor Cyan
Write-Host "║     Advanced Engineering Calculator - Windows Build         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please download from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error installing dependencies!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "Step 2: Copying HTML file..." -ForegroundColor Yellow

if (Test-Path "..\dist\index.html") {
    Copy-Item "..\dist\index.html" "index.html" -Force
    Write-Host "✓ HTML file copied" -ForegroundColor Green
} else {
    Write-Host "⚠ dist/index.html not found - please build main project first" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 3: Building EXE..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error building EXE!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                    ✓ Build Complete!                       ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Files are located in: dist\" -ForegroundColor Cyan

# Open dist folder
Start-Process explorer.exe "dist"

Read-Host "Press Enter to exit"
