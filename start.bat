echo Lancement du backend et du frontend...

:: Lancer le backend dans une nouvelle fenêtre de commande
start cmd /k "cd .\backend && npx tsc && node .\dist\app.js"

:: Lancer le frontend dans une nouvelle fenêtre de commande
start cmd /k "cd .\frontend && ng serve"

echo Backend et frontend lancés.
pause
