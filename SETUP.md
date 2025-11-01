# AI Summarizer - Setup Guide

## Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Start the Backend Server

```bash
cd backend
npm start
# Or for development with auto-reload:
npm run dev
```

The backend should start on `http://localhost:5000`

### 4. Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend should start on `http://localhost:3000`

## Backend Configuration

The backend will work out of the box with in-memory storage. For production, you can configure:

### Optional: OpenAI API Key (for better summarization)

Create a `.env` file in the `backend` folder:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

### Optional: Firebase Admin (for persistent vault storage)

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

## Troubleshooting

### "Error searching. Please check if the backend is running."

1. Make sure the backend server is running on port 5000
2. Check if you see `🚀 Server running on port 5000` in the backend terminal
3. Visit `http://localhost:5000/api/health` in your browser - you should see a JSON response
4. Check the browser console for any CORS errors

### Backend won't start

1. Make sure you've run `npm install` in the backend folder
2. Check if port 5000 is already in use by another application
3. Try changing the port in `backend/src/server.js` or set `PORT` in `.env`

### Frontend can't connect to backend

1. Check the backend status indicator in the top right of the dashboard (should show "Backend Online")
2. Make sure both servers are running
3. If you're using a different port, set `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
