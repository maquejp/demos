#!/bin/bash

# Create the angular-todo-app directory and navigate into it
mkdir -p angular-todo-app
cd angular-todo-app

# Create new Angular project with minimal setup and standalone components
ng new angular-todo-app --standalone --routing --ssr=false --style=css --skip-tests --skip-git --directory=. <<EOF
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

echo '<div
  class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
>
  <h1 class="text-4xl font-bold mb-4 animate-bounce">
    🎉 Tailwind CSS is Working!
  </h1>
  <button
    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300"
  >
    Click Me
  </button>
</div>
' > src/app/app.component.html

echo "import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-todo-app';
}
" > src/app/app.component.ts
