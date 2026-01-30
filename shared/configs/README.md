# Shared Configurations

This directory contains shared configuration files for development tools and build processes across all demos.

## Overview

These configurations ensure:

- Consistent development standards across projects
- Automated code quality and formatting
- Unified build and deployment processes
- Team collaboration best practices
- Reduced configuration duplication

## Available Configurations

### ESLint Configuration (`eslint/`)

- Consistent linting rules across JavaScript/TypeScript projects
- Framework-specific rules for React, Angular, Node.js
- Automated code quality enforcement
- IDE integration and real-time feedback

### Prettier Configuration (`prettier/`)

- Unified code formatting standards
- Consistent style across all projects
- Automated formatting on save/commit
- Integration with development workflows

## Usage

### ESLint

Add to your project's `.eslintrc.json`:

```json
{
  "extends": ["./shared/configs/eslint/.eslintrc.json"]
}
```

Or in `package.json`:

```json
{
  "eslintConfig": {
    "extends": "./shared/configs/eslint"
  }
}
```

### Prettier

Add to your project's `package.json`:

```json
{
  "prettier": "./shared/configs/prettier/.prettierrc.json"
}
```

## Configuration Files

### ESLint

- `.eslintrc.json` - Base ESLint configuration
- Framework-specific overrides
- Plugin configurations and custom rules

### Prettier

- `.prettierrc.json` - Formatting rules
- `.prettierignore` - Files to exclude
- Integration scripts and hooks

## Integration

- Pre-commit hooks with Husky and lint-staged
- GitHub Actions for CI/CD validation
- VS Code workspace settings
- IDE plugins and extensions

## Benefits

- Consistent code quality across all demos
- Reduced setup time for new projects
- Unified development experience
- Automated standards enforcement
- Easier code reviews and collaboration
