# Deployment Guide

This guide walks you through deploying Vividverse MVP to production.

## Prerequisites

1. **Node.js 18+** - For backend and frontend
2. **Database** - MongoDB Atlas or PostgreSQL (cloud recommended)
3. **Cloud Storage** - AWS S3, Cloudinary, or similar
4. **API Keys** - For AI services (OpenAI, ElevenLabs, Luma, etc.)
5. **Hosting** - Heroku, Railway, AWS, Vercel, etc.

## Local Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install AI orchestrator dependencies
cd ai-orchestrator
npm install
cd ..
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Database

Use a cloud database service (recommended) or local:
- MongoDB Atlas (free tier available)
- PostgreSQL on Railway/Heroku
- Local MongoDB/PostgreSQL

### 4. Start Development Servers

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

## Deploying to Production

### Option 1: Heroku

#### Backend Deployment

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
cd backend
heroku create vividverse-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your_database_url
heroku config:set JWT_SECRET=your_jwt_secret
# ... add other env vars

# Deploy
git push heroku main
```

#### Frontend Deployment

```bash
cd frontend
# Build for production
npm run build

# Deploy to Vercel/Netlify
vercel --prod
# or
netlify deploy --prod
```

### Option 2: Railway

1. Connect your GitHub repository
2. Create services for backend and frontend
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

### Option 3: AWS/Google Cloud

- Use EC2/Compute Engine for backend
- Use S3/Cloud Storage for files
- Use RDS/Cloud SQL for database
- Use CloudFront/CDN for frontend

### 4. Update Frontend Configuration

After deployment, update the API URL in:
- `frontend/src/services/api.js`
- Environment variables

## Setting Up AI Orchestrator

### 1. Configure Environment Variables

Copy `env.example` to `.env` and fill in your API keys:

```bash
cp env.example .env
```

### 2. Install FFmpeg

- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt-get install ffmpeg`
- **Windows**: Download from [ffmpeg.org](https://ffmpeg.org/download.html)

### 3. Run Orchestrator

The orchestrator can run as:
- **Standalone service**: `node src/ai_orchestrator/index.js <scriptId> <scriptPath>`
- **Scheduled job**: Set up cron job or systemd service
- **API endpoint**: Wrap in Express/Fastify server

## Environment Variables

### Backend (.env in backend/)

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=mongodb://... or postgresql://...
JWT_SECRET=your_secret_key
CLOUD_STORAGE_PROVIDER=aws|cloudinary|s3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=...
# or Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend (.env in frontend/)

```env
VITE_API_URL=https://your-backend-url.com
VITE_APP_NAME=Vividverse
```

### AI Orchestrator (.env in ai-orchestrator/)

See `env.example` for all required variables.

## Troubleshooting

### Database Connection Fails

- Check connection string format
- Verify database credentials
- Ensure database is accessible from hosting provider
- Check firewall/security group settings

### Frontend Can't Connect to Backend

- Verify API URL matches backend deployment URL
- Check CORS settings in backend
- Ensure backend is deployed and running
- Check network/firewall settings

### AI Generation Fails

- Verify API keys are correct
- Check API rate limits
- Ensure FFmpeg is installed and in PATH
- Check temp/output directories have write permissions

## Production Checklist

- [ ] Deploy backend to hosting service
- [ ] Deploy frontend to hosting service
- [ ] Set up production database
- [ ] Configure cloud storage
- [ ] Set up environment variables
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring/logging
- [ ] Configure API rate limiting
- [ ] Set up backup for database and storage
- [ ] Configure CDN for movie delivery
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure SSL certificates
- [ ] Set up CI/CD pipeline
- [ ] Load testing
- [ ] Security audit

## Next Steps

After MVP deployment:
1. Monitor performance and errors
2. Scale infrastructure as needed
3. Add analytics and monitoring
4. Implement caching strategies
5. Optimize database queries



