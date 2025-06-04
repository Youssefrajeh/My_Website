#!/usr/bin/env python3
"""
Secure Flask Server for AI Chatbot
This version uses environment variables for API keys instead of hardcoded values.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

print("Starting Flask server...")
print("Chat API available at http://localhost:5000/api/chat")

app = Flask(__name__)
CORS(app)

# Get API keys from environment variables
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
HF_API_KEY = os.getenv('HUGGING_FACE_API_KEY')
PORT = int(os.getenv('PORT', 5000))
DEBUG = os.getenv('DEBUG', 'true').lower() == 'true'

def get_smart_response(message):
    """Enhanced smart response function with comprehensive coverage"""
    msg = message.lower()
    
    # Jokes
    if 'joke' in msg or 'funny' in msg or 'laugh' in msg:
        jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they don't C#! 👓",
            "What's a programmer's favorite hangout place? Foo Bar! 🍺",
            "Why did the programmer quit his job? He didn't get arrays! 📊"
        ]
        return jokes[hash(message) % len(jokes)]
    
    # Personal questions about the AI
    if any(phrase in msg for phrase in ['how old', 'your age', 'age are you']):
        return "I'm a digital AI assistant, so I don't have an age in the traditional sense! I was created to help visitors learn about Youssef's portfolio. How can I assist you today? 🤖"
    
    if any(phrase in msg for phrase in ['where are you', 'your location', 'located']):
        return "I exist in the digital realm! I'm hosted on this portfolio website to help visitors learn about Youssef Rajeh's skills and projects. He's located in London, Ontario, Canada. 🌐"
    
    if any(phrase in msg for phrase in ['what is my name', 'my name', 'who am i']):
        return "I don't know your name, but I'd love to help you learn about Youssef Rajeh's portfolio! Feel free to ask me about his programming skills, projects, or experience. 😊"
    
    if any(phrase in msg for phrase in ['your name', 'who are you', 'what are you']):
        return "I'm Youssef's AI assistant! I'm here to help visitors learn about his skills, projects, and experience. Think of me as his digital portfolio guide! 🤖"
    
    # Greetings
    if any(word in msg for word in ['hello', 'hi', 'hey']):
        return "Hello! I'm an AI assistant that can help answer questions about programming, technology, math, and more. I can also tell you about Youssef's portfolio and experience. What would you like to know? 👋"
    
    # Portfolio-specific responses
    if any(word in msg for word in ['skill', 'programming', 'language']):
        return "Youssef has expertise in C++ (90%), Java (80%), JavaScript (80%), HTML (85%), CSS (85%), SQL (75%), C# (70%), and Kotlin (75%). He's also skilled in Cisco Networking (85%). His strongest area is C++ programming! 💪"
    
    if any(word in msg for word in ['experience', 'work', 'job']):
        return "Youssef has 15+ years of professional experience spanning chemistry, quality control, and production management across Syria and Cameroon. He's currently pursuing Computer Programming at Fanshawe College with a 3.9 GPA and seeking software development opportunities! 🌟"
    
    if any(word in msg for word in ['project', 'github', 'code']):
        return "Youssef has developed several impressive C++ projects including an Emergency Room Triage system using priority queues, a Breast Cancer Decision Tree for medical AI, and various data analysis tools. Check out his GitHub for more details! 🚀"
    
    if any(word in msg for word in ['contact', 'email', 'phone', 'hire']):
        return "You can reach Youssef at youssefrrajeh@gmail.com or +1 (548) 388-4360. He's located in London, Ontario, Canada and is actively seeking software development opportunities! 📧📞"
    
    # Math calculations
    if any(op in msg for op in ['+', '-', '*', '/', 'calculate']):
        try:
            import re
            math_expression = re.search(r'[\d+\-*/\.\s()]+', msg)
            if math_expression:
                # Safe evaluation of basic math expressions
                expression = math_expression.group(0).strip()
                # Remove any non-math characters for safety
                safe_expression = re.sub(r'[^0-9+\-*/.() ]', '', expression)
                if safe_expression:
                    result = eval(safe_expression)
                    return f"The answer is: {result} 🧮"
        except:
            return "I can help with basic math calculations. Try asking something like '5 + 3' or 'calculate 10 * 2'. 📊"
    
    # Default responses
    default_responses = [
        "That's an interesting question! I can help with programming topics, math, general knowledge, jokes, and information about Youssef's portfolio. What would you like to explore? 🤔",
        "I'm here to help! I can answer questions about software development, technology, basic calculations, tell jokes, and share details about this portfolio. What catches your interest? 💡",
        "Great question! I'm best at discussing programming, technology, math problems, general knowledge, and portfolio information. I can even tell jokes! What would you like to know? 🎈"
    ]
    
    return default_responses[hash(message) % len(default_responses)]

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        print(f"Received message: {message}")
        
        # Try OpenAI first (if API key is available)
        if OPENAI_API_KEY and OPENAI_API_KEY != 'your_openai_api_key_here':
            try:
                headers = {
                    'Authorization': f'Bearer {OPENAI_API_KEY}',
                    'Content-Type': 'application/json'
                }
                
                payload = {
                    'model': 'gpt-3.5-turbo',
                    'messages': [
                        {'role': 'system', 'content': 'You are a helpful AI assistant for Youssef Rajeh\'s portfolio website. Be friendly, informative, and concise.'},
                        {'role': 'user', 'content': message}
                    ],
                    'max_tokens': 150,
                    'temperature': 0.7
                }
                
                response = requests.post(
                    'https://api.openai.com/v1/chat/completions',
                    headers=headers,
                    json=payload,
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return jsonify({
                        'response': data['choices'][0]['message']['content'].strip(),
                        'source': 'openai'
                    })
                else:
                    print(f"OpenAI API failed with status: {response.status_code}")
                    
            except Exception as e:
                print(f"OpenAI error: {e}")
        
        # Try Hugging Face as fallback (if API key is available)
        if HF_API_KEY and HF_API_KEY != 'your_hugging_face_api_key_here':
            try:
                hf_response = requests.post(
                    'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
                    headers={
                        'Authorization': f'Bearer {HF_API_KEY}',
                        'Content-Type': 'application/json'
                    },
                    json={
                        'inputs': message,
                        'parameters': {
                            'max_length': 100,
                            'temperature': 0.7
                        }
                    },
                    timeout=10
                )
                
                if hf_response.status_code == 200:
                    hf_data = hf_response.json()
                    if hf_data and len(hf_data) > 0 and 'generated_text' in hf_data[0]:
                        return jsonify({
                            'response': hf_data[0]['generated_text'],
                            'source': 'huggingface'
                        })
                else:
                    print(f"Hugging Face API failed with status: {hf_response.status_code}")
                    
            except Exception as hf_error:
                print(f"Hugging Face error: {hf_error}")
        
        # Use smart fallback response
        print("Using smart fallback response")
        smart_response = get_smart_response(message)
        return jsonify({
            'response': smart_response,
            'source': 'fallback'
        })
        
    except Exception as e:
        print(f"Chat API error: {e}")
        return jsonify({
            'response': "I'm sorry, I'm having trouble right now. Please try again later! 😅",
            'source': 'error'
        }), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'AI Chatbot API is running!',
        'endpoints': {
            'chat': '/api/chat (POST)'
        }
    })

if __name__ == '__main__':
    # Check if API keys are configured
    if not OPENAI_API_KEY or OPENAI_API_KEY == 'your_openai_api_key_here':
        print("⚠️  OpenAI API key not configured - will use fallback responses")
    
    if not HF_API_KEY or HF_API_KEY == 'your_hugging_face_api_key_here':
        print("⚠️  Hugging Face API key not configured - will use fallback responses")
    
    app.run(host='0.0.0.0', port=PORT, debug=DEBUG) 