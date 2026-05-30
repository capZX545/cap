@echo off
chcp 65001 > nul
title ساخت ماشین حساب مهندسی - Building Engineering Calculator

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     ماشین حساب مهندسی پیشرفته - ساخت نسخه ویندوز          ║
echo ║     Advanced Engineering Calculator - Windows Build         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ خطا: Node.js نصب نیست!
    echo ❌ Error: Node.js is not installed!
    echo.
    echo لطفاً Node.js را از آدرس زیر دانلود و نصب کنید:
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js پیدا شد | Node.js found
node --version

echo.
echo ══════════════════════════════════════════════════════════════
echo مرحله 1: نصب وابستگی‌ها | Step 1: Installing dependencies
echo ══════════════════════════════════════════════════════════════
echo.

call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ خطا در نصب وابستگی‌ها!
    echo ❌ Error installing dependencies!
    pause
    exit /b 1
)

echo.
echo ✓ وابستگی‌ها نصب شدند | Dependencies installed
echo.

echo ══════════════════════════════════════════════════════════════
echo مرحله 2: کپی فایل HTML | Step 2: Copying HTML file
echo ══════════════════════════════════════════════════════════════
echo.

:: Copy the built HTML file from parent dist folder
if exist "..\dist\index.html" (
    copy /Y "..\dist\index.html" "index.html" > nul
    echo ✓ فایل HTML کپی شد | HTML file copied
) else (
    echo ⚠ فایل dist/index.html پیدا نشد
    echo ⚠ dist/index.html not found
    echo لطفاً ابتدا پروژه اصلی را build کنید
    echo Please build the main project first
)

echo.
echo ══════════════════════════════════════════════════════════════
echo مرحله 3: ساخت فایل EXE | Step 3: Building EXE file
echo ══════════════════════════════════════════════════════════════
echo.

call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ خطا در ساخت EXE!
    echo ❌ Error building EXE!
    pause
    exit /b 1
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✓ ساخت کامل شد!                        ║
echo ║                    ✓ Build Complete!                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo فایل‌های ساخته شده در پوشه dist قرار دارند:
echo Built files are located in the dist folder:
echo.
echo   📁 dist\
echo      ├── Engineering Calculator Setup-x64.exe (نصب‌کننده)
echo      ├── Engineering Calculator-Portable.exe (پرتابل)
echo      └── win-unpacked\ (فایل‌های استخراج شده)
echo.
echo ══════════════════════════════════════════════════════════════

:: Open dist folder
explorer dist

pause
