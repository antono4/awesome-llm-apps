# 🚀 DevUtils CLI

A powerful command-line toolkit for developers that boosts productivity with essential utilities for code formatting, file operations, Git workflows, and project scaffolding.

## ✨ Features

### 🛠️ Code Utilities
- **JSON Formatter** - Pretty print and minify JSON files
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **UUID Generator** - Generate UUIDs v1, v4, and v7
- **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes

### 📁 File Operations
- **File Search** - Search files by name, extension, or content
- **Batch Rename** - Rename multiple files with patterns
- **File Info** - Get detailed file information
- **Directory Tree** - Visual directory structure

### 🔀 Git Utilities
- **Quick Commit** - Stage and commit with one command
- **Branch Info** - View branch details and history
- **Git Stats** - Contribution statistics

### ⚡ Project Scaffolding
- **Quick Project** - Bootstrap new projects from templates
- **Component Generator** - Generate code components

## 📦 Installation

```bash
# Using npm
npm install -g devutils-cli

# Using yarn
yarn global add devutils-cli

# Using pnpm
pnpm add -g devutils-cli
```

## 🚀 Quick Start

```bash
# Format JSON
devutils json format input.json

# Generate UUID
devutils uuid generate

# Encode Base64
devutils base64 encode "Hello World"

# Search files
devutils search "*.js" --path ./src

# Quick commit
devutils git commit "feat: add new feature"
```

## 🎯 Usage

### JSON Commands
```bash
# Pretty print JSON
devutils json format data.json

# Minify JSON
devutils json minify data.json

# Validate JSON
devutils json validate data.json
```

### UUID Commands
```bash
# Generate UUID v4
devutils uuid generate

# Generate UUID v7
devutils uuid generate --version 7

# Validate UUID
devutils uuid validate <uuid>
```

### Hash Commands
```bash
# Generate SHA-256 hash
devutils hash generate --algorithm sha256 file.txt

# Generate MD5 hash
devutils hash generate --algorithm md5 "string"
```

### File Commands
```bash
# Find files
devutils file find --pattern "*.ts" --path ./src

# Directory tree
devutils file tree --path ./src --depth 3

# File info
devutils file info path/to/file.txt
```

## 🔧 Configuration

Create a `~/.devutils/config.json` file:

```json
{
  "defaults": {
    "indent": 2,
    "hashAlgorithm": "sha256"
  },
  "aliases": {
    "jf": "json format",
    "uuid": "uuid generate"
  }
}
```

## 📚 Commands

| Command | Description |
|---------|-------------|
| `devutils json <action>` | JSON operations |
| `devutils uuid <action>` | UUID operations |
| `devutils base64 <action>` | Base64 operations |
| `devutils hash <action>` | Hash operations |
| `devutils file <action>` | File operations |
| `devutils git <action>` | Git operations |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**antono4**
- GitHub: [@antono4](https://github.com/antono4)

## 🙏 Acknowledgments

- Built with ❤️ for the developer community
- Inspired by various CLI tools and developer needs

---

<p align="center">
  Made with 💻 by <a href="https://github.com/antono4">antono4</a>
</p>
