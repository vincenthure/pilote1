#!/bin/bash

git clone https://github.com/waveshare/LCD-show.git
cd LCD-show
sudo ./LCD35-show

# instalation nodejs

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs

# ouvrir nodejs sans sudo

sudo apt-get install libcap2-bin
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

# recuparation du programme pilote et des modules nodejs

git clone https://github.com/vincenthure/pilote1.git
cd ~/pilote1
npm install

# installation et gestion du service pilote

cd configuration
sudo cp pilote.service /etc/systemd/system
sudo systemctl enable pilote.service   

# autoboot"

cp .profile ~
cp .xinitrc ~

sudo reboot
