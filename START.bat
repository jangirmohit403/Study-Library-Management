@echo off
title Study Library Management - Dev Server
cd /d "C:\Users\MCI-PC\OneDrive\Desktop\Study Library Management"
echo Starting Study Library Management...
echo.
echo On this computer: http://localhost:5173/
echo On your phone (same Wi-Fi): http://10.110.88.240:5173/
echo Login: admin / 1234
echo.
echo Close this window to stop the server.
echo.
C:\nodejs\npm.cmd run dev -- --host 0.0.0.0
pause
