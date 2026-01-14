# UI Development Guide - Vividverse

## 🎨 Quick Start for UI Development

The frontend is now set up to run in **mock mode** for UI development. This allows you to work on the look and feel without needing the Node.js backend.

## ✅ What's Ready

- ✅ React frontend with Vite
- ✅ Mock authentication (no backend required)
- ✅ Mock service layer with sample data
- ✅ All pages and components functional for UI work

## 🚀 Running the Frontend

1. **Navigate to frontend directory:**
   ```bash
   cd src/coverce_frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will be available at `http://localhost:3000`
   - You'll see the Vividverse homepage

## 🎭 Mock Mode Features

### Authentication
- Click "Login" to simulate authentication (no real login required)
- You'll be logged in as a mock user
- Logout works normally

### Sample Data
The mock service includes:
- 2 sample scripts ("The Last Sunset" and "Digital Dreams")
- Mock validation scores
- Mock movie data

### What Works
- ✅ Home page
- ✅ Script submission (saves to mock data)
- ✅ Script listing
- ✅ Validator dashboard
- ✅ Validation scoring
- ✅ Movie viewer

## 📝 Working on UI

### Pages to Customize
- `src/coverce_frontend/src/pages/Home.tsx` - Homepage
- `src/coverce_frontend/src/pages/SubmitScript.tsx` - Script submission
- `src/coverce_frontend/src/pages/ScriptList.tsx` - Script listing
- `src/coverce_frontend/src/pages/ValidatorDashboard.tsx` - Validator interface
- `src/coverce_frontend/src/pages/MovieViewer.tsx` - Movie playback

### Styles
- Each page has its own CSS file (e.g., `Home.css`)
- Global styles in `index.css`
- Navbar styles in `components/Navbar.css`

### Components
- `components/Navbar.tsx` - Navigation bar

## 🔄 Switching Back to Real Backend

When you're ready to connect to a real backend:

1. **Update imports in:**
   - `App.tsx` - Change `AuthContext.mock` → `AuthContext`
   - All page files - Change `vividverseService.mock` → `vividverseService`
   - `components/Navbar.tsx` - Change `AuthContext.mock` → `AuthContext`

2. **Or use environment variables:**
   - Set up `.env` file with `VITE_USE_MOCK_AUTH=false`
   - Update the index files to use conditional imports

## 🎯 Next Steps

1. **Start the dev server** and explore the UI
2. **Customize styles** in the CSS files
3. **Modify components** to match your design vision
4. **Test interactions** - all mock functions log to console

## 💡 Tips

- Check the browser console for mock service logs (prefixed with 🎨, 📝, etc.)
- Mock data persists in memory while the dev server is running
- Refresh the page to reset mock data
- All API calls are simulated with delays to feel realistic

## 🐛 Troubleshooting

**Port 3000 already in use?**
- Change the port in `vite.config.ts` or kill the process using port 3000

**Styles not updating?**
- Hard refresh (Ctrl+Shift+R) or clear browser cache

**TypeScript errors?**
- Run `npm install` again
- Check that all mock files are in place

---

**Happy designing! 🎨**
