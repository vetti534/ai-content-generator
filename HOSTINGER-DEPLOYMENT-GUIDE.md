# AI Social Media Content Generator - Hostinger Deployment Guide

## Important: Hostinger Hosting Requirements

**CRITICAL:** This application requires **Node.js hosting** with **PostgreSQL database** support. 

### Before You Begin - Check Your Hostinger Plan:
- ✅ **Node.js support** (required)
- ✅ **PostgreSQL database** (required) 
- ✅ **File upload capability** (required for image/video processing)

If your current Hostinger plan doesn't support Node.js + PostgreSQL, you'll need to:
1. Upgrade to a plan that supports Node.js applications, OR
2. Use alternative hosting like Vercel, Railway, or Render (all have free tiers)

## Step-by-Step Deployment Guide

### Step 1: Get Required API Keys

**OpenAI API Key** (Required for content generation):
1. Go to https://platform.openai.com/api-keys
2. Create account and add payment method
3. Generate new API key
4. Copy and save it securely

### Step 2: Set Up Database

**Option A: Hostinger PostgreSQL**
1. In Hostinger control panel, create PostgreSQL database
2. Note down: host, port, database name, username, password

**Option B: External Database (Recommended)**
1. Go to https://neon.tech or https://supabase.com
2. Create free PostgreSQL database
3. Copy the connection string

### Step 3: Upload Files to Hostinger

1. Download and extract the deployment package
2. Upload ALL files to your domain's public_html folder (or Node.js app folder)
3. Ensure folder structure looks like:
```
your-domain.com/
├── client/
├── server/
├── shared/
├── uploads/ (create this folder with write permissions)
├── package.json
├── package-lock.json
└── other files...
```

### Step 4: Configure Environment Variables

In Hostinger control panel or create `.env` file:
```
DATABASE_URL=postgresql://username:password@host:port/database
OPENAI_API_KEY=sk-your-openai-key-here
NODE_ENV=production
SESSION_SECRET=your-very-long-random-string-here
PORT=5000
```

### Step 5: Install Dependencies & Setup

SSH into your Hostinger server or use File Manager terminal:

```bash
# Install dependencies
npm install --production

# Build the application
npm run build

# Set up database tables
npm run db:push

# Start the application
npm start
```

### Step 6: Configure Domain & Port

1. In Hostinger control panel, point your domain to the Node.js application
2. Set the port to 5000 (or whatever Hostinger assigns)
3. Enable HTTPS if available

## Testing Your Deployment

Visit your domain - you should see:
1. Landing page for non-logged users
2. Login functionality working
3. Content generation working (requires OpenAI key)
4. File upload working

## Troubleshooting

**Common Issues:**

1. **"Cannot connect to database"**
   - Check DATABASE_URL format
   - Ensure database exists and is accessible

2. **"OpenAI API Error"**
   - Verify API key is correct
   - Check OpenAI account has credits

3. **File upload not working**
   - Ensure `uploads/` folder exists with write permissions
   - Check file size limits in Hostinger

4. **App not starting**
   - Check Node.js version (requires 18+)
   - Review error logs in Hostinger control panel

## Alternative Hosting (If Hostinger Doesn't Work)

If Hostinger doesn't support Node.js properly:

**Vercel (Easiest):**
1. Push code to GitHub
2. Connect Vercel to GitHub
3. Add environment variables
4. Deploy automatically

**Railway:**
1. Connect GitHub repository
2. Add PostgreSQL service
3. Configure environment variables
4. Deploy

## Support

If you encounter issues:
1. Check Hostinger's Node.js documentation
2. Verify all environment variables are set
3. Check server logs for specific errors
4. Consider using alternative hosting if Hostinger limitations are blocking deployment