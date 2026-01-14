# Vividverse Architecture

## System Overview

Vividverse is a platform for script submission, validation, and AI-powered film generation, built with Node.js and React.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Submit     │  │  Validator   │  │   Movie      │      │
│  │   Portal     │  │  Dashboard   │  │   Viewer     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  JWT Authentication                                          │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTPS / REST API
                       │
┌──────────────────────▼───────────────────────────────────────┐
│            Backend (Node.js/Express API)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • Script Storage (Database)                         │   │
│  │  • Validation Management                             │   │
│  │  • Score Aggregation                                 │   │
│  │  • Movie Metadata                                    │   │
│  │  • File Upload (Cloud Storage)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                       │                                       │
│                       │ Database                               │
│                       ▼                                       │
│              ┌──────────────────┐                            │
│              │  MongoDB/        │                            │
│              │  PostgreSQL      │                            │
│              └──────────────────┘                            │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTP API Calls
                       │
┌──────────────────────▼───────────────────────────────────────┐
│          AI Film Generator Orchestrator (Node.js)            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • Script Parsing (Fountain/PDF)                     │   │
│  │  • Scene Generation                                   │   │
│  │  • AI API Integration                                 │   │
│  │  • Video/Audio/Image Generation                       │   │
│  │  • FFmpeg Stitching                                   │   │
│  │  • Cloud Storage Upload                               │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│  Video AI    │ │  Image AI  │ │  Audio AI  │
│  • Luma      │ │  • DALL-E  │ │  • 11Labs  │
│  • Runway    │ │  • Stable  │ │  • OpenAI  │
│  • Pika      │ │  • Flux    │ │            │
│  • Kling     │ │            │ │            │
└──────────────┘ └────────────┘ └────────────┘
```

## Component Details

### 1. Frontend (React + TypeScript)

**Location**: `frontend/`

**Technologies**:
- React 18
- TypeScript
- Vite
- React Router
- Axios (HTTP client)

**Key Components**:
- `AuthContext` - JWT authentication
- `apiService` - REST API communication
- Pages: Home, SubmitScript, ValidatorDashboard, ScriptList, MovieViewer

**Features**:
- JWT-based authentication
- Script upload (PDF, Fountain, Text)
- Validation scoring interface
- Movie playback

### 2. Backend (Node.js/Express)

**Location**: `backend/`

**Technologies**:
- Node.js
- Express.js
- MongoDB/PostgreSQL
- JWT authentication
- Multer (file uploads)

**Key Routes**:
- `POST /api/scripts` - Submit script
- `POST /api/validations` - Submit validation scores
- `GET /api/scripts/:id/score` - Get aggregated scores
- `POST /api/movies/generate` - Trigger AI generation
- `PUT /api/movies/:id/progress` - Update generation status

**Data Models**:
- Script (ID, title, content, author, status, createdAt)
- Validation (scriptId, validatorId, scores, comments)
- AggregatedScore (scriptId, averageScores, totalValidations)
- Movie (scriptId, videoUrl, status, progress)

### 3. AI Orchestrator (Node.js)

**Location**: `ai-orchestrator/`

**Technologies**:
- Node.js
- Axios (HTTP requests)
- FFmpeg (video processing)
- Various AI API clients

**Workflow**:
1. Parse script into scenes
2. Generate prompts for each scene
3. Call AI APIs in parallel:
   - Video generation (Luma/Runway/Pika/Kling)
   - Image generation (DALL-E/Stability/Flux)
   - Audio generation (ElevenLabs/OpenAI)
4. Combine video + audio per scene
5. Stitch all scenes with FFmpeg
6. Upload final movie to cloud storage

## Data Flow

### Script Submission Flow

```
User → Frontend → JWT Auth → Express API
                                    ↓
                            Store Script (Database)
                            Upload File (Cloud Storage)
                                    ↓
                            Status: PendingValidation
```

### Validation Flow

```
Validator → Frontend → Express API
                            ↓
                    Store Validation Score (Database)
                            ↓
                    Recalculate Aggregated Score
                            ↓
                    Update Script Status
```

### Movie Generation Flow

```
Top Script Selected → Express API
                            ↓
                    Status: Selected
                            ↓
                    Trigger AI Orchestrator
                            ↓
                    Parse Script → Scenes
                            ↓
                    Generate (Video + Image + Audio) × N scenes
                            ↓
                    Stitch with FFmpeg
                            ↓
                    Upload to Cloud Storage
                            ↓
                    Update Database: Status = Completed
                            ↓
                    Frontend: Display Movie
```

## Storage

### Database Storage

- **Scripts**: Metadata stored in MongoDB/PostgreSQL
- **Script Files**: Uploaded to cloud storage (AWS S3, Cloudinary)
- **Validations**: Stored as documents/rows in database
- **Movies**: Metadata in database, video files in cloud storage

### Cloud Storage

- Large files (scripts, movies) stored on:
  - AWS S3
  - Cloudinary
  - Google Cloud Storage
  - Azure Blob Storage

## Security

### Authentication
- JWT tokens (stateless)
- Password hashing (bcrypt)
- Token expiration and refresh

### Authorization
- Role-based access control (RBAC)
- Validators must register
- Script authors identified by user ID
- Admin roles for movie generation triggers

### Data Integrity
- Script content hashing
- Database transactions for consistency
- Timestamped submissions
- Input validation and sanitization

## Scalability Considerations

### Current MVP
- Single backend instance (sufficient for MVP)
- Sequential processing
- Basic database and storage

### Future Scaling
- **Horizontal Scaling**: Multiple backend instances with load balancer
- **Database**: Read replicas, connection pooling
- **CDN**: For movie delivery
- **Queue System**: Redis/RabbitMQ for AI generation jobs
- **Caching**: Redis for frequently accessed data
- **Load Balancing**: Multiple orchestrator instances

## Integration Points

### Bittensor (Future V2/V3)
- Replace manual validators with subnet
- TAO rewards for submissions
- Decentralized scoring network
- Validator staking

### External APIs
- Video: Luma, Runway, Pika, Kling
- Image: OpenAI, Stability, Flux
- Audio: ElevenLabs, OpenAI TTS

## Monitoring & Observability

### Recommended Tools
- Application monitoring (New Relic, Datadog)
- Logging service (for orchestrator)
- Error tracking (Sentry)
- Analytics (user behavior)

## Cost Estimation

### Infrastructure Costs (Monthly)
- Database hosting: ~$10-50 (MongoDB Atlas/PostgreSQL)
- Cloud storage: ~$5-20 per GB (AWS S3, Cloudinary)
- Backend hosting: ~$10-50 (Heroku, Railway, AWS)
- Frontend hosting: ~$0-20 (Vercel, Netlify)

### AI API Costs
- Video generation: $0.10-1.00 per minute
- Image generation: $0.02-0.20 per image
- Audio generation: $0.01-0.10 per minute

### Example: 5-minute movie
- 20 scenes × $0.50 = $10 (video)
- 20 images × $0.10 = $2 (images)
- 5 minutes × $0.05 = $0.25 (audio)
- **Total: ~$12-15 per movie**

## Future Enhancements

1. **Bittensor Integration**
   - Subnet for validation
   - TAO rewards
   - Decentralized scoring

2. **Advanced Features**
   - Multi-language support
   - Custom AI model training
   - Collaborative editing
   - Version control

3. **Monetization**
   - Subscription tiers
   - Pay-per-generation
   - Revenue sharing with creators



