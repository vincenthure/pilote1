# pilote1

Installer raspbian sur carte Sd
configurer le RPI en local avec l'outils graphique


hostname :  remote
password :  admin
SSH : on
reboot : console login as pi
Location, clavier...
Wifi

Se connecter par un autre ordi en mode console
ssh pi@remote.local

login pi

password admin

exectuter les commandes contenu dans le fichier configuration/intall.sh


connexion wifi en ip fixe 192.168.0.101

gestion du service

fichier /etc/systemd/system/pilote.service

sudo systemctl start pilote.service

sudo systemctl enable pilote.service

sudo systemctl restart pilote.service

sudo systemctl stop pilote.service

sudo systemctl status pilote.service

journalctl -u pilote.service
