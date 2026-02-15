@echo off
SET TIMESTAMP=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2%_%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%
SET TIMESTAMP=%TIMESTAMP: =0%
SET BACKUP_FILE=mindgraphix_backup_%TIMESTAMP%.sql

echo [BAK] Debut de la sauvegarde de la base de donnes...
"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -U postgres -p 5433 -d mindgraphix_dev > %BACKUP_FILE%

if %ERRORLEVEL% EQU 0 (
    echo [OK] Sauvegarde terminee : %BACKUP_FILE%
) else (
    echo [ERREUR] La sauvegarde a echoue. Verifiez que PostgreSQL est installe et accessible.
)
pause