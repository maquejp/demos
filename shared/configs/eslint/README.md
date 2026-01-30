# ESLint Configuration

This directory contains shared ESLint configurations for consistent code quality and style across all demos.

## Overview

These configurations ensure:

- Consistent code style and quality standards
- Framework-specific best practices
- Automated error detection and prevention
- Team collaboration standards
- IDE integration for real-time feedback

## Available Configurations

### Base Configuration (`base.js`)

- Core ESLint rules for JavaScript/TypeScript
- Modern ES6+ syntax support
- Common best practices and patterns
- Extensible foundation for project-specific rules

## Usage

### Extend Base Configuration

In your project's `.eslintrc.json`:

```json
{
  "extends": ["./shared/configs/eslint/base.js"]
}
```

### With Framework-Specific Rules

```json
{
  "extends": [
    "./shared/configs/eslint/base.js",
    "@typescript-eslint/recommended",
    "plugin:react/recommended"
  ]
}
```

### In package.json

```json
{
  "eslintConfig": {
    "extends": "./shared/configs/eslint/base.js"
  }
}
```

## Configuration Rules

### Code Quality

- No unused variables and imports
- Consistent variable declarations
- Proper error handling
- Clean code practices

### Code Style

- Consistent indentation and spacing
- Naming conventions
- Import/export organization
- Function and class structure

### TypeScript Support

- Type checking and validation
- Interface consistency
- Generic usage best practices
- Import/export type safety

## Integration

### Pre-commit Hooks

```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": ["eslint --fix", "git add"]
  }
}
```

### VS Code Settings

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### CI/CD Integration

```yaml
- name: ESLint Check
  run: npx eslint . --ext .js,.ts,.tsx
```

## Customization

### Project-Specific Overrides

```json
{
  "extends": "./shared/configs/eslint/base.js",
  "rules": {
    "custom-rule": "error"
  }
}
```

### Framework Extensions

- React: `plugin:react/recommended`
- Angular: `@angular-eslint/recommended`
- Node.js: `plugin:node/recommended`

## Benefits

- Consistent code quality across all demos
- Automated error prevention
- Better developer experience
- Reduced code review time
- Unified team standards
