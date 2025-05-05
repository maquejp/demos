#!/bin/bash

# Create the angular-todo-app directory and navigate into it
mkdir -p angular-todo-app
cd angular-todo-app

# Create new Angular project with minimal setup and standalone components
ng new angular-todo-app --standalone --routing --ssr=false --style=css --skip-tests --skip-git --directory=. <<EOF
n
EOF

# Install Tailwind CSS and its peer dependencies as per official docs
npm install tailwindcss @tailwindcss/postcss postcss --force

# Create .postcssrc.json configuration
cat > .postcssrc.json << 'EOF'
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
EOF

# Update styles.css with Tailwind import
echo '@import "tailwindcss";' > src/styles.css
