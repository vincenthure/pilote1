# pilote1

Installer raspbian lite sur carte Sd
créer un fichier nommé ssh dans la partition boot

login pi
password rqspberry

sudo raspi-config
change User Password admin
Network option / N1 Hostname / remote
Localisation Options 
I1 Change locale fr_FR.UTF-8 UTF-8
I2 Change Timezone / Europe /Paris
I3 Change Keyboard Layout
I4 Change Wi-fi Country / France

sudo reboot
git clone https://github.com/vincenthure/pilote1.git
cd pilote1/configuration
./install.sh



gestion du service

fichier /etc/systemd/system/pilote.service

sudo systemctl start pilote.service
sudo systemctl enable pilote.service
sudo systemctl restart pilote.service
sudo systemctl stop pilote.service
sudo systemctl status pilote.service

journalctl -u pilote.service