# Quick Start Guide

Get Vividverse MVP running in 10 minutes.

## Prerequisites

- Node.js 18+ installed
- MongoDB or PostgreSQL installed (or use cloud service like MongoDB Atlas)
- FFmpeg installed (for video processing)

## Step 1: Clone and Install

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

## Step 2: Set Up Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration:
# - Database connection string
# - JWT secret key
# - Cloud storage credentials (AWS S3, Cloudinary, etc.)
# - AI API keys (OpenAI, ElevenLabs, etc.)
```

## Step 3: Start Database

```bash
# MongoDB (local)
mongod

# Or use MongoDB Atlas (cloud) - update connection string in .env
# Or PostgreSQL (local)
pg_ctl start
```

## Step 4: Start Backend

In a new terminal:

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:5000` (or your configured port).

## Step 5: Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Step 6: Test the Application

1. **Open** `http://localhost:3000` in your browser
2. **Register/Login** with email and password
3. **Submit a Script**:
   - Click "Submit Script"
   - Enter title and upload a file
   - Submit
4. **Become a Validator**:
   - Click "Validate" in navbar
   - Register as validator
   - Score the script
5. **View Scripts**:
   - Click "Scripts" to see all submissions
   - View scores and status

## Testing AI Generation (Optional)

To test the AI orchestrator:

1. **Install FFmpeg**:
   ```bash
   # macOS
   brew install ffmpeg
   
   # Linux
   sudo apt-get install ffmpeg
   ```

2. **Configure API Keys**:
   ```bash
   cd src/ai_orchestrator
   cp ../../env.example .env
   # Edit .env with your API keys
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Orchestrator**:
   ```bash
   node index.js <scriptId> <path/to/script.txt>
   ```

## Troubleshooting

### "Cannot connect to database"
- Make sure your database is running
- Check connection string in `.env` file
- Verify database credentials

### Frontend can't connect to backend
- Check backend is running on the correct port
- Verify API URL in `frontend/src/services/api.js`
- Check CORS settings in backend
- Restart both frontend and backend servers

### Authentication not working
- Verify JWT secret is set in `.env`
- Check token expiration settings
- Ensure cookies/localStorage is enabled in browser

### File upload fails
- Check cloud storage credentials in `.env`
- Verify file size limits in backend
- Check upload directory permissions

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Customize AI providers in `ai-orchestrator/index.js`
- Add your own validation logic in `backend/src/`

## Getting Help

- Check [README.md](./README.md) for overview
- Review code comments in source files
- Node.js Docs: https://nodejs.org/docs/
- Express Docs: https://expressjs.com/
- React Docs: https://react.dev/



