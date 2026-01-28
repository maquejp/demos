#!/bin/bash

# Create and start tmux session with backend and frontend running
tmux new-session -d -s dev-logs 'npm run dev --prefix backend'
tmux split-window -h -t dev-logs 'npm run dev --prefix frontend'

# Attach to the tmux session in a new VS Code terminal
tmux attach -t dev-logs
