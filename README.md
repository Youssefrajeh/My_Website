# Youssef Rajeh - Portfolio Website

A modern, responsive portfolio website showcasing software development skills, projects, and experience. Features an AI-powered chatbot for interactive visitor engagement.

## 🌟 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **AI Chatbot**: Interactive assistant powered by multiple AI APIs with smart fallbacks
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Project Showcase**: Detailed presentation of development projects
- **Contact Form**: EmailJS integration for direct communication
- **SEO Optimized**: Enhanced meta tags and structured data

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome 5.15.4 for icons
- Google Fonts (Poppins)
- Typed.js for typing animations
- GSAP for advanced animations
- Particles.js for background effects

### Backend (Optional AI Features)
- Python 3.x
- Flask web framework
- OpenAI API (GPT-3.5-turbo)
- Hugging Face API (DialoGPT)
- Smart fallback responses

## 🚀 Quick Start

### Option 1: Static Website (No AI Features)
1. Clone the repository
2. Open `index.html` in a web browser
3. The chatbot will use smart fallback responses only

### Option 2: Full AI Features
1. Clone the repository
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy environment template:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` with your API keys:
   ```env
   OPENAI_API_KEY=your_actual_openai_key
   HUGGING_FACE_API_KEY=your_actual_hf_key
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   ```
5. Start the Flask server:
   ```bash
   python server_secure.py
   ```
6. Open `index.html` and test the full AI chatbot

## 🔒 Security Features

- **Environment Variables**: All API keys stored in `.env` files (not committed)
- **Gitignore Protection**: Sensitive files automatically excluded from version control
- **API Key Validation**: Server checks for valid keys before making API calls
- **Fallback System**: Works without API keys using smart local responses
- **Input Sanitization**: Safe handling of user inputs and math expressions

## 🎯 AI Chatbot Capabilities

The AI assistant can help with:
- **Programming Questions**: Languages, frameworks, best practices
- **Portfolio Information**: Skills, experience, projects, contact details
- **General Knowledge**: Technology topics, explanations
- **Math Calculations**: Basic arithmetic and expressions
- **Interactive Conversation**: Jokes, greetings, personal questions

### Response Hierarchy
1. **OpenAI GPT-3.5-turbo** (primary) ✨
2. **Hugging Face DialoGPT** (secondary) 🤗
3. **Smart Local Responses** (fallback) 🧠

## 📧 Contact Integration

The contact form uses EmailJS for serverless email delivery:
1. Create an EmailJS account
2. Set up a service and email template
3. Add your keys to the `.env` file
4. Configure the template to receive form submissions

## 🌐 Deployment Options

### GitHub Pages (Static)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Chatbot will use fallback responses only

### Heroku (Full Features)
1. Create Heroku app
2. Add Python buildpack
3. Set environment variables in Heroku dashboard
4. Deploy from GitHub or CLI

### Netlify (Hybrid)
1. Deploy frontend to Netlify
2. Deploy backend to Heroku/Railway/Render
3. Update API endpoints in frontend code

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # Frontend JavaScript
├── server_secure.py        # Secure Flask backend
├── requirements.txt        # Python dependencies
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── README.md              # This file
└── images/                # Project images and assets
```

## 🔧 Customization

### Updating Content
- Edit personal information in `index.html`
- Modify skills percentages in the skills section
- Add/remove projects in the projects section
- Update contact information

### Styling
- Customize colors in CSS variables (`:root` section)
- Modify animations and transitions
- Adjust responsive breakpoints

### AI Responses
- Edit smart responses in `server_secure.py`
- Add new conversation topics
- Modify response personality and tone

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⚠️ Important Security Notes

- **Never commit `.env` files** - they contain sensitive API keys
- **Regenerate API keys** if accidentally exposed
- **Use environment variables** for all sensitive configuration
- **Regular security audits** of dependencies and code

## 📞 Support

For questions or support, please contact:
- **Email**: youssefrrajeh@gmail.com
- **LinkedIn**: [linkedin.com/in/youssefrajeh](https://www.linkedin.com/in/youssefrajeh)
- **GitHub**: [github.com/Youssefrajeh](https://github.com/Youssefrajeh)

---

**Built with ❤️ by Youssef Rajeh**
