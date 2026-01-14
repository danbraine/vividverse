# Vividverse Setup Guide

Complete guide to set up the full Vividverse platform with Node.js/Express backend and React frontend.

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- (Optional) FFmpeg for AI orchestrator

## Step 1: Install Dependencies

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd src/coverce_frontend
npm install
cd ../..

# AI Orchestrator dependencies
cd src/ai_orchestrator
npm install
cd ../..
```

## Step 2: Set Up Environment Variables

### Backend Environment

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vividverse
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment

Create `src/coverce_frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_USE_MOCK_AUTH=false
VITE_USE_MOCK_SERVICE=false
```

## Step 3: Start MongoDB

### Local MongoDB:
```bash
mongod
```

### MongoDB Atlas:
- Create a free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `MONGODB_URI` in `backend/.env`

## Step 4: Start the Backend

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

## Step 5: Start the Frontend

In a new terminal:

```bash
cd src/coverce_frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## Step 6: Test the Platform

1. Open `http://localhost:3000`
2. Register a new account
3. Submit a script
4. Register as validator (in profile)
5. Validate scripts
6. View generated movies

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile

### Scripts
- `POST /api/scripts` - Submit script (requires auth)
- `GET /api/scripts/pending` - Get pending scripts
- `GET /api/scripts/all` - Get all scripts
- `GET /api/scripts/:id` - Get script by ID
- `GET /api/scripts/top` - Get top script

### Validations
- `POST /api/validations/register` - Register as validator
- `GET /api/validations/status` - Check validator status
- `POST /api/validations/:scriptId` - Submit validation
- `GET /api/validations/:scriptId` - Get validations for script

### Movies
- `POST /api/movies/generate/:scriptId` - Start movie generation
- `GET /api/movies/:scriptId` - Get movie by script ID
- `GET /api/movies/:scriptId/score` - Get aggregated score

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `VITE_API_URL` in frontend `.env`

### CORS Errors
- Make sure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check that backend CORS middleware is configured

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET is set
- Verify token is being sent in requests

## Next Steps

1. Set up cloud storage (AWS S3 or Cloudinary)
2. Configure AI API keys
3. Set up AI orchestrator
4. Deploy to production

## Development Mode

To use mock data for UI development:

Set in `src/coverce_frontend/.env`:
```env
VITE_USE_MOCK_AUTH=true
VITE_USE_MOCK_SERVICE=true
```

This allows frontend development without backend running.
