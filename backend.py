"""
AI Chat Backend - Flask API Server
Supports OpenAI, Anthropic, Google Gemini, and local Ollama
"""

import os
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# ============================================================================
# LLM PROVIDERS
# ============================================================================

class LLMProvider:
    """Base class for LLM providers"""
    
    def __init__(self, api_key=None):
        self.api_key = api_key
    
    def chat(self, messages, model, temperature=0.7, **kwargs):
        raise NotImplementedError


class OpenAIProvider(LLMProvider):
    """OpenAI GPT models"""
    
    def chat(self, messages, model="gpt-4o", temperature=0.7, **kwargs):
        try:
            from openai import OpenAI
            client = OpenAI(api_key=self.api_key or os.getenv("OPENAI_API_KEY"))
            
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                **kwargs
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"OpenAI Error: {str(e)}"


class AnthropicProvider(LLMProvider):
    """Anthropic Claude models"""
    
    def chat(self, messages, model="claude-3-5-sonnet-20241022", temperature=0.7, **kwargs):
        try:
            from anthropic import Anthropic
            client = Anthropic(api_key=self.api_key or os.getenv("ANTHROPIC_API_KEY"))
            
            # Convert messages format for Anthropic
            system_prompt = ""
            anthropic_messages = []
            
            for msg in messages:
                if msg.get("role") == "system":
                    system_prompt = msg.get("content", "")
                else:
                    anthropic_messages.append({
                        "role": msg.get("role"),
                        "content": msg.get("content")
                    })
            
            response = client.messages.create(
                model=model,
                system=system_prompt,
                messages=anthropic_messages,
                temperature=temperature,
                max_tokens=4096,
                **kwargs
            )
            return response.content[0].text
        except Exception as e:
            return f"Anthropic Error: {str(e)}"


class GeminiProvider(LLMProvider):
    """Google Gemini models"""
    
    def chat(self, messages, model="gemini-1.5-flash", temperature=0.7, **kwargs):
        try:
            import google.generativeai as genai
            genai.configure(api_key=self.api_key or os.getenv("GOOGLE_API_KEY"))
            
            model_obj = genai.GenerativeModel(model)
            
            # Convert messages to Gemini format
            chat = model_obj.start_chat(history=[])
            
            # Send all messages except the last one as history
            for msg in messages[:-1]:
                if msg.get("role") == "user":
                    chat.send_message(msg.get("content"))
            
            # Send the actual prompt
            response = chat.send_message(
                messages[-1].get("content", ""),
                generation_config={"temperature": temperature}
            )
            return response.text
        except Exception as e:
            return f"Gemini Error: {str(e)}"


class OllamaProvider(LLMProvider):
    """Local Ollama models"""
    
    def chat(self, messages, model="llama3", temperature=0.7, **kwargs):
        try:
            import requests
            
            response = requests.post(
                "http://localhost:11434/api/chat",
                json={
                    "model": model,
                    "messages": messages,
                    "temperature": temperature,
                    **kwargs
                },
                timeout=120
            )
            
            if response.status_code == 200:
                return response.json().get("message", {}).get("content", "No response")
            else:
                return f"Ollama Error: {response.status_code}"
        except Exception as e:
            return f"Ollama Error: {str(e)}. Make sure Ollama is running at localhost:11434"


# Provider factory
def get_provider(provider_name, api_key=None):
    providers = {
        "openai": OpenAIProvider,
        "anthropic": AnthropicProvider,
        "gemini": GeminiProvider,
        "local": OllamaProvider,
    }
    provider_class = providers.get(provider_name, OpenAIProvider)
    return provider_class(api_key)


# ============================================================================
# FLASK ROUTES
# ============================================================================

@app.route('/')
def index():
    """Serve the frontend"""
    return send_from_directory('.', 'index.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    data = request.get_json()
    
    messages = data.get('messages', [])
    provider_name = data.get('provider', 'openai')
    model = data.get('model', 'gpt-4o')
    temperature = float(data.get('temperature', 0.7))
    api_key = data.get('apiKey')
    
    # Get provider and make request
    provider = get_provider(provider_name, api_key)
    response = provider.chat(messages, model, temperature)
    
    return jsonify({
        'success': True,
        'response': response,
        'model': model,
        'provider': provider_name
    })


@app.route('/api/models/<provider>', methods=['GET'])
def get_models(provider):
    """Get available models for a provider"""
    models = {
        "openai": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"],
        "anthropic": ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"],
        "gemini": ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-1.0-pro"],
        "local": ["llama3", "llama3.1", "mistral", "codellama", "phi3", "qwen2", "gemma2"]
    }
    return jsonify({
        'models': models.get(provider, [])
    })


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0',
        'providers': ['openai', 'anthropic', 'gemini', 'local']
    })


@app.route('/api/stream', methods=['POST'])
def stream():
    """Streaming chat endpoint (for OpenAI)"""
    from flask import Response
    import queue
    import threading
    
    data = request.get_json()
    messages = data.get('messages', [])
    model = data.get('model', 'gpt-4o')
    api_key = data.get('apiKey') or os.getenv("OPENAI_API_KEY")
    
    def generate():
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)
            
            stream = client.chat.completions.create(
                model=model,
                messages=messages,
                stream=True,
                temperature=0.7
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield f"data: {json.dumps({'content': chunk.\n"
    
    return Response(
        generate(),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no'
        }
    )


# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    print("""
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🤖  AI Chat Backend Server                              ║
║                                                           ║
║   Local:    http://localhost:5000                          ║
║   Network:  http://0.0.0.0:5000                           ║
║                                                           ║
║   Supported Providers:                                    ║
║   • OpenAI (GPT-4, GPT-3.5)                               ║
║   • Anthropic (Claude 3)                                  ║
║   • Google Gemini                                         ║
║   • Local Ollama                                          ║
║                                                           ║
║   Set API keys as environment variables:                  ║
║   • OPENAI_API_KEY                                        ║
║   • ANTHROPIC_API_KEY                                     ║
║   • GOOGLE_API_KEY                                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    """)
    
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)
