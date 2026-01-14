# Vividverse MVP

The minimum viable product for Vividverse - a platform where writers submit scripts, validators judge them, and AI generates movies from winning submissions.

## Architecture

**Frontend (React app)**
- Miner Submission Portal - Writers upload scripts
- Validator Dashboard - Judges score scripts
- Movie Viewer - Users watch generated films

**Backend (Node.js/Express API)**
- Script storage and management
- Validation scoring system
- AI orchestration for film generation

**AI Layer (External APIs)**
- Video generation (Luma, Runway, Pika, Kling)
- Image generation (DALL·E, Stability, Flux)
- Audio generation (ElevenLabs, OpenAI)
- Video editing (FFmpeg, Remotion)

## Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB installed (or use MongoDB Atlas)
- FFmpeg installed (for video processing - optional for AI orchestrator)

### Local Development

1. Install project dependencies:
```bash
npm install
cd backend && npm install && cd ..
cd src/coverce_frontend && npm install && cd ../..
cd src/ai_orchestrator && npm install && cd ../..
```

2. Set up environment variables:
```bash
# Backend
cd backend
cp ../.env.example .env
# Edit .env with your database and JWT secret

# Frontend
cd ../src/coverce_frontend
# Create .env with: VITE_API_URL=http://localhost:5000/api
```

3. Start database:
```bash
# MongoDB: mongod (or use MongoDB Atlas)
```

4. Start backend server (in a new terminal):
```bash
cd backend && npm run dev
```

5. Start frontend dev server (in a new terminal):
```bash
cd src/coverce_frontend && npm run dev
```

6. Open `http://localhost:3000` in your browser

**📖 For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

## Project Structure

```
vividverse/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── routes/             # API routes
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Database models
│   │   ├── middleware/         # Auth & validation
│   │   └── services/           # Business logic
│   ├── server.js               # Express server entry
│   └── package.json
├── src/
│   ├── coverce_frontend/       # React frontend
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   ├── pages/          # Page components
│   │   │   ├── services/       # API service layer
│   │   │   └── utils/          # Utilities
│   │   └── package.json
│   └── ai_orchestrator/        # AI film generator
│       ├── index.js
│       └── package.json
└── README.md
```

## Features

### ✅ MVP Features
- [x] JWT-based authentication
- [x] Script upload (PDF, Fountain format)
- [x] Script storage in database and cloud storage
- [x] Validation dashboard
- [x] Scoring rubric system
- [x] AI film generation orchestrator
- [x] Movie storage and playback

### 🚀 Future Features (V2/V3)
- Bittensor subnet integration
- TAO rewards for submissions
- Validator staking
- Decentralized scoring network

## Development Roadmap

- **Week 1-2**: Core infrastructure (auth, storage, basic UI)
- **Week 3-4**: Validation system and scoring
- **Week 5-6**: AI integration and film generation
- **Week 7-8**: Polish, testing, and deployment

## License

MIT

