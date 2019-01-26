//////////////////  installation remote ///////////////

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs

// pour ouvrir nodejs sans sudo

sudo apt-get install libcap2-bin
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

//installation du programme pilote

git clone https://github.com/vincenthure/pilote1.git
cd pilote1
npm install

//test du programme
node app.js

//installation et gestion du service
cd /etc/systemd/system
sudo nano pilote.service
sudo systemctl start pilote.service
sudo systemctl enable pilote.service   // demmarrage automatique au boot
sudo systemctl restart pilote.service
sudo systemctl stop pilote.service
sudo systemctl status pilote.service

pour consulter le fichier log
journalctl -u pilote.service

boot en mode console en tant que pi (raspi-config)
mofifier le fichier .profile (dans /home/pi) pour qu'il lance startx
installer le fichier .xinitrc (dans /home/pi) pour lancer chrome en mode kiosque

git clone https://github.com/waveshare/LCD-show.git
cd LCD-show
sudo ./LCD35-show

//////////////////  installation pilote ///////////////

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs

sudo apt-get install libcap2-bin
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

git clone https://github.com/vincenthure/pilote2.git
cd pilote2

npm install

node bleno.js

cd /etc/systemd/system
sudo nano pilote.service

[Unit]
Description=Pilote
After=network.target

[Service]
ExecStart=/usr/bin/node /home/pi/pilote2/bleno.js
StandardOutput=inherit
StandardError=inherit
Restart=always

[Install]
WantedBy=default.target

sudo chmod 777 pilote.service
sudo systemctl start pilote.service
sudo systemctl enable pilote.service

pour consulter le fichier log
journalctl -u pilote.service

///////////////// mise à jour //////////////////

git add --all
git commit -m "new commit"
git push
name vincenthure
pdm Mx9wed25
