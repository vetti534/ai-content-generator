# AI Social Media Content Generator - Production Deployment

## What's Included
This package contains your complete AI social media content generator application ready for production deployment.

## Quick Start for Hostinger

### 1. Check Requirements
- Node.js hosting plan (required)
- PostgreSQL database (required)
- OpenAI API key (required)

### 2. Upload Files
Extract and upload all files to your Hostinger Node.js app directory

### 3. Install Dependencies
```bash
npm install --production
```

### 4. Set Environment Variables
Create `.env` file or use Hostinger control panel:
```
DATABASE_URL=postgresql://user:pass@host:port/database
OPENAI_API_KEY=sk-your-key-here
SESSION_SECRET=long-random-string
NODE_ENV=production
```

### 5. Set Up Database
```bash
npm run db:push
```

### 6. Build & Start
```bash
npm run build
npm start
```

## Features
- Multi-platform social media content generation
- AI-powered content analysis with OpenAI GPT-4o
- File upload support (images, videos up to 20GB)
- Multi-language support (15+ languages)
- User authentication with Replit Auth
- PostgreSQL database persistence

## File Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared schemas
├── uploads/         # File uploads (auto-created)
├── package.json     # Dependencies
└── .env.example     # Environment template
```

## Troubleshooting
1. **Database errors**: Check DATABASE_URL format
2. **OpenAI errors**: Verify API key and account credits
3. **File uploads**: Ensure uploads/ folder has write permissions
4. **Build errors**: Run `npm install` first

## Alternative Hosting
If Hostinger doesn't work:
- Vercel (recommended for easy deployment)
- Railway (includes PostgreSQL)
- Render (full-stack hosting)

## Support
Refer to HOSTINGER-DEPLOYMENT-GUIDE.md for detailed instructions.