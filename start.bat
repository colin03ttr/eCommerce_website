echo Lancement du backend et du frontend...

:: Lancer le backend dans une nouvelle fenêtre de commande
start cmd /k "cd .\backend && npx tsc && node .\dist\app.js"

:: Lancer le frontend dans une nouvelle fenêtre de commande
start cmd /k "cd .\frontend && ng serve"

:: Wait for the frontend to start before opening the browser
echo Waiting for the frontend to be ready...
timeout /t 8 >nul

:: Ouvrir le navigateur à l'adresse http://localhost:4200/
start "" "http://localhost:4200/"

echo Backend et frontend lancés.
pause
