@echo off

echo "__ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __"
echo "  _                _            __                 _                 _ "
echo " | | ___ __  _   _| |_ _   _   / _|_ __ ___  _ __ | |_ ___ _ __   __| |"
echo " | |/ / '_ \| | | | __| | | | | |_| '__/ _ \| '_ \| __/ _ \ '_ \ / _` |"
echo " |   <| | | | |_| | |_| |_| | |  _| | | (_) | | | | ||  __/ | | | (_| |"
echo " |_|\_\_| |_|\__,_|\__|\__,_| |_| |_|  \___/|_| |_|\__\___|_| |_|\__,_|"
echo "__ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __"
echo.

:Build
echo Building...
set /p CHOICE="Which env Are You Wanting To Build? (Local: 1 Dev: 2)"
if "%CHOICE%" == "1" goto Local
if "%CHOICE%" == "2" goto Dev

if defined CHOICE (
    set CHOICE=
    echo Wrong Character
    goto Build
)

:: Local Setting
:Local
echo Local building...
echo.
start node settingLocal.js

:: ServerBoost
echo ServerBoosting...
echo.
cd ../backend/knutu
start ServerBootstrapper.cmd

goto final

:: Dev Setting
:Dev
echo Dev building...
echo.
start node settingDev.js
goto final

:: Build Start
:final
npm run build