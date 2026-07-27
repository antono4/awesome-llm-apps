# 🤖 AI Chat - Modern LLM Chat Application

A beautiful, modern AI chat application with support for multiple LLM providers (OpenAI, Anthropic, Google Gemini, and local Ollama).

![AI Chat Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Modern Dark Theme UI** - Sleek, professional interface
- 💬 **Chat History** - Persistent conversations stored locally
- 🔄 **Multiple LLM Providers**:
  - OpenAI (GPT-4, GPT-4o, GPT-3.5)
  - Anthropic (Claude 3 Opus, Sonnet, Haiku)
  - Google Gemini
  - Local Ollama (Llama3, Mistral, etc.)
- 📝 **Code Highlighting** - Syntax highlighting for code blocks
- 📱 **Responsive Design** - Works on desktop and mobile
- 💾 **Local Storage** - Chat history saved in browser
- ⚙️ **Configurable Settings** - Temperature, model selection
- 🌐 **Streaming Support** - Real-time response streaming

## 🚀 Quick Start

### Option 1: Frontend Only (Demo Mode)

Simply open `index.html` in your browser to see the demo with simulated responses.

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Option 2: Full Stack (With Real AI)

#### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 2. Set API Keys

```bash
# Choose your preferred provider(s)

# OpenAI (recommended for best experience)
export OPENAI_API_KEY="sk-your-api-key-here"

# Anthropic (Claude)
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Google Gemini
export GOOGLE_API_KEY="your-gemini-api-key"
```

#### 3. Run the Server

```bash
python backend.py
```

#### 4. Open in Browser

Navigate to: http://localhost:5000

### Option 3: Local Models (Ollama)

If you prefer running models locally:

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3

# Start Ollama server (usually runs automatically)
ollama serve

# Run the app
python backend.py
```

## 📁 Project Structure

```
llm-app/
├── index.html      # Frontend (standalone, works without backend)
├── backend.py      # Flask API server
├── requirements.txt # Python dependencies
└── README.md       # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key | For OpenAI models |
| `ANTHROPIC_API_KEY` | Anthropic API key | For Claude models |
| `GOOGLE_API_KEY` | Google API key | For Gemini models |

### Settings (in-app)

- **Provider**: Select your preferred LLM provider
- **Model**: Choose specific model (varies by provider)
- **Temperature**: Response randomness (0.0 - 2.0)
- **API Key**: Override environment variable

## 🎯 API Endpoints

### POST `/api/chat`

Send a chat message and receive AI response.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "provider": "openai",
  "model": "gpt-4o",
  "temperature": 0.7,
  "apiKey": "optional-api-key"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Hello! How can I help you today?",
  "model": "gpt-4o",
  "provider": "openai"
}
```

### GET `/api/models/<provider>`

Get available models for a provider.

**Response:**
```json
{
  "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"]
}
```

### GET `/api/health`

Health check endpoint.

## 🖥️ Screenshots

### Main Chat Interface
- Modern dark theme with gradient accents
- Responsive message bubbles
- Typing indicators
- Code syntax highlighting

### Settings Modal
- Provider selection
- Model switching
- Temperature control
- API key management

## 🛠️ Development

### Adding New Providers

1. Create a new provider class inheriting from `LLMProvider`
2. Implement the `chat()` method
3. Add to the `get_provider()` factory function
4. Update frontend model selectors

```python
class NewProvider(LLMProvider):
    def chat(self, messages, model, temperature=0.7, **kwargs):
        # Implementation
        return response
```

### Frontend Customization

The frontend is standalone HTML/CSS/JS. To modify:

- **Styling**: Edit CSS in `<style>` tag
- **Logic**: Modify JavaScript in `<script>` tag
- **Icons**: Uses Remix Icons CDN

## 📝 License

MIT License - feel free to use and modify!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

*Built with ❤️ by AI Chat Team*
