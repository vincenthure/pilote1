# pilote1

Installer raspbian sur carte Sd

configurer le RPI en local

hostname :  remote
password :  admin
SSH : on
reboot : console login as pi

ssh pi@raspberry.local

login pi

password admin








gestion du service

fichier /etc/systemd/system/pilote.service

sudo systemctl start pilote.service

sudo systemctl enable pilote.service

sudo systemctl restart pilote.service

sudo systemctl stop pilote.service

sudo systemctl status pilote.service

journalctl -u pilote.service