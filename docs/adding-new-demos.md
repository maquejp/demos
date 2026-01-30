# Adding New Demos

This guide explains how to add new demos to the project structure when using VS Code in workspace mode.

## Quick Steps

1. **Create a new branch:**

   ```bash
   git checkout -b feature/demo-name
   ```

2. **Choose the appropriate location:**
   - `simple/` - Basic demos (no DB, no API)
   - `containerized/` - Demos requiring devcontainers

3. **Create demo folder:**

   ```bash
   mkdir -p simple/web/your-demo-name
   # or
   mkdir -p containerized/api/your-demo-name
   ```

4. **Initialize your project in the created folder:**

   ```bash
   cd simple/web/your-demo-name
   # Add your framework/tooling initialization commands here
   ```

5. **Create a README file:**
   - Add `README.md` with setup instructions, dependencies, and usage
   - Follow the pattern of other demos

6. **VS Code workspace:**
   - The existing `demos.code-workspace` should automatically detect new folders
   - No manual workspace configuration needed

7. **Commit and push changes:**

   ```bash
   git add .
   git commit -m "Add demo-name: brief description"
   git push origin feature/demo-name
   ```

8. **Create pull request:**
   - Open GitHub and create a PR from your feature branch to main
   - Wait for review and merge

## Example: Vite/React Demo

```bash
# Create branch
git checkout -b feature/vite-react-demo

# Create folder
mkdir -p simple/web/vite-react-demo

# Initialize project
cd simple/web/vite-react-demo
npm create vite@latest . -- --template react
npm install

# Create README
echo "# Vite React Demo

## Setup
\`\`\`bash
npm install
\`\`\`

## Development
\`\`\`bash
npm run dev
\`\`\`

## Build
\`\`\`bash
npm run build
\`\`\`" > README.md

# Commit and push
git add .
git commit -m "Add vite-react-demo: Basic Vite React application"
git push origin feature/vite-react-demo
```

## Best Practices

- **Always work in a feature branch** - Never commit directly to main
- Keep demo names descriptive but concise
- Include setup and usage instructions in each demo's README
- Use appropriate folder structure (simple vs containerized)
- Test the demo setup before creating the pull request
- Write clear commit messages following the project's conventions
- Delete the feature branch after the PR is merged

## Folder Structure Reference

```text
demos/
├── simple/
│   ├── web/          # Frontend demos
│   ├── cli/          # CLI tool demos
│   └── api/          # Simple API demos
└── containerized/
    ├── web/          # Containerized web apps
    ├── api/          # Containerized APIs
    └── db/           # Database-integrated demos
```
