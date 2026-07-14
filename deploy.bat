@echo off
echo.
echo  Uploading changes to GitHub...
echo  ================================
cd /d "c:\Users\Manu\Desktop\CLT INDIA"
set PATH=%PATH%;C:\Users\Manu\AppData\Local\Programs\Git\bin;C:\Users\Manu\AppData\Local\Programs\Git\cmd
git add .
git commit -m "update: %date% %time%"
git push origin main
echo.
echo  Done! Website will be live in ~30 seconds on Netlify.
echo  ================================
pause
