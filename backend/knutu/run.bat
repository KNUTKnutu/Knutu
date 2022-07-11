@echo off

:: 0. Preparing...

chcp 65001
COLOR D

echo.

echo "                                                                      "
echo "ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ"
echo "                                                                      "
echo "  _  __            _           ____             _                  _  "
echo " | |/ /           | |         |  _ \           | |                | | "
echo " | ' / _ __  _   _| |_ _   _  | |_) | __ _  ___| | _____ _ __   __| | "
echo " |  < | '_ \| | | | __| | | | |  _ < / _\` |/ __| |/ / _ \ '_ \ / _\` "
echo " | . \| | | | |_| | |_| |_| | | |_) | (_| | (__|   <  __/ | | | (_| | "
echo " |_|\_\_| |_|\__,_|\__|\__,_| |____/ \__,_|\___|_|\_\___|_| |_|\__,_| "
echo "                                                                      "
echo "                                                                      "
echo "ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ"
echo "                                                                      "
echo.

:: 0-2. For Building...
if /i "%1"=="build" (
    echo BUILDING FRONTEND PROJECT...
    cd ../../frontend/
    npm run build
    cd ../backend/knutu
    chcp 65001
    echo BUILDING FRONTEND PROJECT DONE!
    goto final
) 

:: 1. Serve Frontend Project

echo SERVING FRONTEND PROJECT...
echo.

    :: 1-1. Set symbolic link between static folders
    echo SETTING SYMBOLIC LINK FOR STATIC FRONTEND PAGES...
    echo.
    cd "src/main/resources"
    if /i exist "static" (
        rd "static"
    )
    mklink /d static "%FRONTEND_DIST_PATH%"

    :: get back to the location of run.bat
    cd "../../../../../backend/knutu"

        :: 1-1-1. Check whether symbolic link is valid now
        if /i not exist "src/main/resources/static" (
            echo.
            echo Symbolic link was not made successfully. Please check frontend folder if the static folder has been moved.
            goto final
        )
        else (
            echo.
            echo SETTING SYMBOLIC LINK FOR STATIC FRONTEND PAGES DONE!
            echo.
            goto setting_symbolic_link_finish
        )

        :setting_symbolic_link_finish

echo SERVING FRONTEND PROJECT DONE!
echo.

:: 2. Bootstrapping Springboot Server
echo BOOTSTRAPPING SPRINGBOOT SERVER...
start mvnw.cmd spring-boot:run

:: finally
:final

echo.

timeout /t 10 /nobreak

start chrome -incognito http://localhost:19410