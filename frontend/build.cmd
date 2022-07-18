@echo off

echo Building...
choice /m "Which env Are You Wanting To Build (Local: Y Dev: N)"
if "%ERRORLEVEL%" == "1" goto Local
if "%ERRORLEVEL%" == "2" goto Dev

:: Local Setting
:Local
:: ServerBoost
echo ServerBoosting...
echo.
cd ../backend/knutu
start ServerBootstrapper.cmd

echo Local building...
echo.
cd ../../frontend/src/

:: if env exist, delete env
if /i exist "env" (
    rd "env"
)
echo export const API_URL = 'http://localhost:19410'; > env.ts
goto final

:: Dev Setting
:Dev
echo Dev building...
echo.
cd ./src/

:: if env exist, delete env
if /i exist "env" (
    rd "env"
)
:: 
echo export const API_URL = 'https://mighty-sheep-study-119-204-204-253.loca.lt/'; > env.ts
goto final

:: Build Start
:final
cd ../
npm run build
