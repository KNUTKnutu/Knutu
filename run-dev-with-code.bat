@echo off
start cmd /c "cd frontend & npm run dev"
start cmd /c "cd backend\knutu & Serverbootstrapper.cmd"
code .
exit