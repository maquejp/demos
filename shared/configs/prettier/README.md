# Prettier Configuration

This directory contains shared Prettier configurations for consistent code formatting across all demos.

## Overview

These configurations ensure:

- Consistent code style across projects
- Automated formatting and cleanup
- Team collaboration standards
- Integration with IDE and CI/CD

## Available Configurations

Coming soon! This directory will contain Prettier configuration files.

## Configuration Files

- `.prettierrc.json` - Base configuration
- `.prettierrc.json` - Project-specific overrides
- `.prettierignore` - Files to ignore

## Usage

Add to your project's `package.json`:

```json
{
  "prettier": "@demos/prettier-config"
}
```

Or extend the configuration:

```json
{
  "extends": "./shared/configs/prettier/.prettierrc.json"
}
```

## Rules

- 2-space indentation
- Single quotes for strings
- Trailing commas where valid
- Maximum line length: 80 characters
- Print width and tab width standards

## Integration

- VS Code Prettier extension
- Pre-commit hooks with Husky
- GitHub Actions formatting check
- IDE format-on-save configuration
