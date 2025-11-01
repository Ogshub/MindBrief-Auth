# AI Summarizer

A full-stack web application that allows users to search the web for any topic, scrape content from multiple websites, and generate AI-powered summaries. All summaries can be saved to a personal Vault for later reference.

## 🚀 Features

- **Web Search**: Search for any topic and discover relevant websites
- **Content Scraping**: Extract content from multiple websites
- **AI Summarization**: Generate comprehensive summaries from scraped content
- **Vault Storage**: Save and manage your summaries in a personal vault
- **Firebase Authentication**: Secure user authentication and data storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor (VS Code recommended)

## 🛠️ Installation & Setup

### Step 1: Install Backend Dependencies

Open a terminal/command prompt and navigate to the backend folder:

```bash
cd backend
npm install
```

This will install all required packages for the backend server.

### Step 2: Install Frontend Dependencies

Open a **new terminal/command prompt** and navigate to the frontend folder:

```bash
cd frontend
npm install
```

This will install all required packages for the frontend application.

## ▶️ Running the Application

You need to run **two servers** simultaneously: the backend and the frontend.

### Option 1: Using Two Terminal Windows (Recommended)

#### Terminal 1 - Start the Backend Server

```bash
cd backend
npm start
```

You should see:

```
🚀 Server running on port 5000
📊 Environment: development
🔗 Health check: http://localhost:5000/api/health
```

**Keep this terminal window open!** The backend must stay running.

#### Terminal 2 - Start the Frontend Server

Open a **new terminal window** and run:

```bash
cd frontend
npm run dev
```

You should see:

```
▲ Next.js 15.5.6
- Local:        http://localhost:3000
```

### Option 2: Using a Single Terminal (Windows PowerShell)

You can run both servers in the same terminal using PowerShell's background jobs:

```powershell
# Start backend in background
cd backend
Start-Job -ScriptBlock { npm start } | Out-Null

# Start frontend (this will be in foreground)
cd ..\frontend
npm run dev
```

## 🌐 Accessing the Application

Once both servers are running:

1. **Open your web browser**
2. **Navigate to:** `http://localhost:3000`
3. **Login or Sign Up** using Firebase authentication
4. **Start searching and summarizing!**

## 📖 How to Use

### 1. Search for a Topic

1. Enter any topic in the search box (e.g., "Artificial Intelligence", "Climate Change")
2. Click the **"Search"** button
3. Wait for the system to find relevant websites
4. Links will appear in the left sidebar

### 2. Select Links to Summarize

1. Click on links in the sidebar to select them (they'll highlight in purple)
2. Selected links will show a checkmark
3. You can select multiple links
4. Links are also clickable to open in a new tab for verification

### 3. Generate Summary

1. Click the **"Summarize Selected Links"** button at the bottom
2. Wait while the system scrapes content and generates a summary
3. The summary will appear in the main content area

### 4. Save to Vault

1. After a summary is generated, click **"Save to Vault"** button
2. Your summary will be stored in your personal vault
3. Click the **"Vault"** button (top right) to view all saved summaries

### 5. View Your Vault

1. Click the **"Vault"** button in the top-right corner
2. Browse your saved summaries on the left
3. Click any summary to view it in detail
4. Delete summaries using the delete button

## ⚙️ Configuration (Optional)

### OpenAI API Key (For Better Summarization)

If you want AI-powered summarization, add an OpenAI API key:

1. Create a `.env` file in the `backend` folder
2. Add your API key:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

**Note:** Without an API key, the system will still work but will provide simpler combined content instead of AI-enhanced summaries.

### Firebase Admin (For Persistent Storage)

To enable persistent vault storage (instead of in-memory):

1. Get your Firebase service account credentials
2. Add to `backend/.env`:

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

**Note:** Without Firebase Admin, vault storage uses in-memory storage (data resets when server restarts).

## 🐛 Troubleshooting

### "Backend Offline" Error

**Problem:** Frontend shows "Backend Offline" in the navbar.

**Solution:**

1. Check if backend is running in Terminal 1
2. Visit `http://localhost:5000/api/health` in your browser
3. You should see: `{"status":"OK","timestamp":"...","environment":"..."}`
4. If you see an error, the backend isn't running - start it with `npm start` in the backend folder

### "Cannot connect to backend server"

**Problem:** Frontend can't reach the backend.

**Solution:**

1. Make sure backend is running on port 5000
2. Check if port 5000 is already in use:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   ```
3. If port is in use, kill that process or change the port in `backend/src/server.js`

### Port Already in Use Error

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**

1. Find and close the process using port 5000:
   ```bash
   # Windows - Find process
   netstat -ano | findstr :5000
   # Then kill it (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```
2. Or change the port in `backend/src/server.js` (line 13)

### Frontend Won't Start

**Problem:** `npm run dev` fails or shows errors.

**Solution:**

1. Make sure you're in the `frontend` directory
2. Try deleting `node_modules` and reinstalling:
   ```bash
   cd frontend
   rm -r node_modules  # Linux/Mac
   rmdir /s node_modules  # Windows
   npm install
   npm run dev
   ```

### Search Not Working

**Problem:** No links appear when searching.

**Solution:**

1. Check browser console for errors (F12 → Console tab)
2. Verify backend is running and accessible
3. Check if DuckDuckGo is accessible (network/firewall issues)
4. The system has fallback links, so you should still see some results

## 📁 Project Structure

```
AI-Summarizer/
├── backend/           # Backend API server
│   ├── src/
│   │   ├── routes/   # API route handlers
│   │   └── server.js # Main server file
│   └── package.json
├── frontend/         # Next.js frontend application
│   ├── src/
│   │   ├── app/      # Next.js app pages
│   │   ├── components/ # React components
│   │   └── lib/      # Utilities and API client
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Backend

- `npm start` - Start the backend server
- `npm run dev` - Start with auto-reload (requires nodemon)

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🌟 API Endpoints

- `GET /` - API information
- `GET /api/health` - Health check
- `POST /api/search` - Search for websites
- `POST /api/search/scrape` - Scrape content from URL
- `POST /api/summarize` - Generate summary from URLs
- `GET /api/vault/:userId` - Get user's vault items
- `POST /api/vault/:userId` - Save item to vault
- `DELETE /api/vault/:userId/:itemId` - Delete vault item

## 📝 Notes

- The backend must be running before using the frontend
- Vault storage is in-memory by default (data lost on server restart)
- AI summarization requires OpenAI API key for best results
- All web scraping is done server-side to avoid CORS issues

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests.

## 📄 License

MIT License

---

**Happy Summarizing! 🎉**
