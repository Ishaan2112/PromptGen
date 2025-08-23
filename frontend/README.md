# PromptGen Frontend

A modern Next.js frontend application for AI-powered prompt generation, featuring a sleek interface, real-time AI responses, and seamless backend integration.

## 🚀 Features

- **Next.js 15**: Modern React framework with App Router
- **AI-Powered Prompts**: Google Gemini AI integration for intelligent responses
- **Real-time Generation**: Instant prompt creation and analysis
- **Modern UI/UX**: Tailwind CSS with Radix UI components
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety
- **Environment Configuration**: Secure configuration management
- **CORS Support**: Backend integration ready
- **Comprehensive Logging**: Detailed API call tracking
- **Error Handling**: Graceful fallbacks and user feedback

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Google Gemini API key (configured in backend)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd promptgen-tool/frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend API URL
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3000` | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | `PromptGen Tool` | No |

### Backend API Setup

1. Ensure your backend is running on the configured port
2. Update `NEXT_PUBLIC_API_URL` in `.env.local` to match your backend
3. The frontend will automatically connect to the backend

## 🎯 Usage

### Generating Prompts

1. **Open the application** in your browser
2. **Type your request** in the input field (e.g., "marketing email", "blog post")
3. **Press Enter** or click the send button
4. **View AI-generated response** with detailed instructions and context

### Example Prompts

- **Content Creation**: "blog post about AI ethics"
- **Marketing**: "email campaign for product launch"
- **Creative Writing**: "short story opening scene"
- **Business**: "presentation outline for investors"
- **Social Media**: "Instagram caption for travel photo"

## 🏗️ Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main prompt generation page
├── components/             # Reusable UI components
│   └── ui/                # Radix UI components
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
├── .env.local             # Environment variables
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.mjs        # Next.js configuration
└── package.json           # Dependencies and scripts
```

## 🎨 UI Components

- **Prompt Input**: Clean, focused input field
- **Chat Interface**: Real-time conversation display
- **AI Responses**: Rich, formatted prompt content
- **Quick Tips**: Helpful guidance for users
- **Responsive Design**: Works on all device sizes

## 🔌 API Integration

The frontend communicates with the backend through:

- **POST** `/ai/generate-prompt` - Generate new prompts
- **POST** `/ai/analyze-prompt` - Analyze existing prompts
- **GET** `/ai/health` - Backend health check

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push

### Other Platforms

- **Netlify**: Similar to Vercel setup
- **Railway**: Full-stack deployment
- **AWS/GCP**: Custom deployment

## 🧪 Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

### Development Workflow

1. **Make changes** to your code
2. **Test locally** with `pnpm run dev`
3. **Commit and push** to trigger deployment
4. **Monitor** backend API responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Issues**: Create a GitHub issue
- **Documentation**: Check the README and code comments
- **Backend**: Ensure backend is running and accessible

---

**PromptGen** - Your AI-powered prompt generation assistant! 🚀
