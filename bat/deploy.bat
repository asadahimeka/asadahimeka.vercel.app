@echo off
git add .
git commit -m ":pencil: Update hexo %date% %time%"
git push origin hexo
dir source\_posts /b > ..\asadahimeka.github.io\brg\mds.list
del /Q ..\asadahimeka.github.io\brg\mds\*
xcopy source\_posts ..\asadahimeka.github.io\brg\mds /y
xcopy public ..\asadahimeka.github.io\z /s /y
chdir /d ..\asadahimeka.github.io\brg\mds
ren *.md *.txt
chdir /d ..\..\
git add .
git commit -m ":rocket: Update notes %date% %time%"
git push origin master
echo Done!
pause
