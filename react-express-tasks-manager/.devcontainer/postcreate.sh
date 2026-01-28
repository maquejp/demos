#!/bin/bash

sudo apt-get update && sudo apt-get install -y tmux
sudo chown node backend/node_modules frontend/node_modules
npm install --prefix backend
npm install --prefix frontend
chmod +x .devcontainer/poststart.sh
