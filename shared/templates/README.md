# Project Templates

This directory contains reusable templates for quickly setting up new projects and development environments.

## Overview

These templates provide:

- Consistent project structure
- Pre-configured development environments
- Best practices and standards
- Quick project initialization
- Development container configurations

## Available Templates

### Development Container Templates

#### Node.js Development Container (`devcontainer-node.json`)

- Node.js runtime with npm/yarn
- TypeScript support
- Common development tools (ESLint, Prettier)
- VS Code extensions pre-installed
- Debugging configuration

**Usage:**
Copy to `.devcontainer/devcontainer.json` in your project and rebuild the container.

#### Python Development Container (`devcontainer-python.json`)

- Python runtime with pip/poetry
- Common development tools
- Linting and formatting support
- VS Code extensions for Python development
- Virtual environment setup

**Usage:**
Copy to `.devcontainer/devcontainer.json` in your project and rebuild the container.

### Docker Compose Template (`docker-compose.yml`)

- Basic multi-service setup
- Development database services
- Volume mounting for development
- Network configuration
- Environment variable management

**Usage:**
Copy to project root and modify services as needed.

## Template Usage

### Quick Setup

1. Copy the appropriate template to your project
2. Customize configuration values
3. Install dependencies and start development
4. Commit customized files to your repository

### Customization Guidelines

- Update project names and paths
- Adjust versions and configurations
- Add project-specific extensions
- Modify environment variables
- Customize build scripts

## Development Container Features

### Pre-installed Tools

- Git and version control
- Node.js/Python runtimes
- Package managers (npm, yarn, pip, poetry)
- Development utilities (curl, wget, jq)
- Text editors and terminals

### VS Code Extensions

- Language support and syntax highlighting
- Debugging and testing tools
- Git integration
- Docker integration
- Linting and formatting

### File System

- Mounted source code volumes
- Persistent development data
- Build artifact storage
- Log file management
- Configuration file mounting

## Best Practices

- Use specific version tags instead of `latest`
- Keep templates up to date with security patches
- Document any custom modifications
- Test templates with new projects
- Share improvements with the team

## Contributing

When adding new templates:

- Follow existing naming conventions
- Include comprehensive documentation
- Test with multiple project types
- Provide usage examples
- Update this README file
