# Note: Old ICP-Related Files

The following files contain references to ICP (Internet Computer Protocol) and are from the previous ICP-based implementation. These files are kept for reference but are **no longer used** in the current Node.js/Express + React implementation:

## Old Setup/Installation Guides (Not Used)
- `INSTALL_DFX_*.md` - DFX SDK installation guides
- `INSTALL_LINUX*.md` - Linux setup with DFX
- `HOW_TO_RUN.md` - Old ICP-based run instructions
- `QUICK_START_LINUX.md` - Old quick start
- `QUICK_WSL_SETUP.md` - Old WSL setup
- `SETUP_WSL.md` - Old WSL setup
- `PREVIEW_GUIDE.md` - Old ICP preview guide
- `DEPLOY_INTERNET_IDENTITY.md` - Internet Identity deployment
- `FIX_WSL_*.md` - WSL troubleshooting

## Old Scripts (Not Used)
- `setup.sh`, `setup.ps1`, `setup-linux.sh` - Old setup scripts
- `install-dfx-*.ps1`, `install-dfx.sh` - DFX installation scripts

## Old Configuration (Not Used)
- `dfx.json` - ICP project configuration
- `src/coverce_backend/` - Old Motoko backend (replaced by `backend/`)

## Current Implementation

The platform now uses:
- **Backend**: Node.js/Express (`backend/`)
- **Frontend**: React (`src/coverce_frontend/`)
- **Database**: MongoDB
- **Authentication**: JWT
- **Storage**: Cloud storage (AWS S3, Cloudinary, etc.)

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for current setup instructions.
