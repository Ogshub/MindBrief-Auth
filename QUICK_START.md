# Quick Start Guide - Step by Step

## 🎯 Goal: Get both servers running!

You need to run TWO servers at the same time:

1. **Backend server** (port 5000) - handles search and summarization
2. **Frontend server** (port 3000) - the website you'll use

---

## Step-by-Step Instructions

### STEP 1: Install Backend Dependencies

1. **Open PowerShell or Command Prompt** (Windows key + type "PowerShell" or "cmd")
2. Navigate to your project folder:
   ```powershell
   cd C:\Users\pinch\OneDrive\Desktop\AI-Summarizer\backend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. **Wait for it to finish** - you'll see "added XXX packages"

---

### STEP 2: Start Backend Server (Terminal Window 1)

**Keep this window open!** The backend needs to keep running.

1. Still in the backend folder, start the server:

   ```powershell
   npm start
   ```

2. **You should see:**

   ```
   🚀 Server running on port 5000
   📊 Environment: development
   🔗 Health check: http://localhost:5000/api/health
   ```

3. **✅ GOOD!** Your backend is running. **Don't close this window!**

---

### STEP 3: Install Frontend Dependencies

1. **Open a NEW PowerShell or Command Prompt window**

   - (Don't close the backend window!)
   - Windows key + type "PowerShell" to open another one

2. Navigate to the frontend folder:

   ```powershell
   cd C:\Users\pinch\OneDrive\Desktop\AI-Summarizer\frontend
   ```

3. Install dependencies:

   ```powershell
   npm install
   ```

4. **Wait for it to finish**

---

### STEP 4: Start Frontend Server (Terminal Window 2)

1. Still in the frontend folder, start the frontend:

   ```powershell
   npm run dev
   ```

2. **You should see:**

   ```
   ▲ Next.js 15.5.6
   - Local:        http://localhost:3000
   ```

3. **✅ GREAT!** Both servers are now running!

---

### STEP 5: Open the Application

1. **Open your web browser** (Chrome, Edge, Firefox, etc.)
2. **Go to:** `http://localhost:3000`
3. You should see the login page!

---

## 🎉 You're Ready!

Now you can:

- Sign up or login
- Search for topics
- Generate summaries
- Save to your vault

---

## ⚠️ Important Notes

### Keep Both Terminals Open!

- **Terminal 1** (Backend) - Must stay running
- **Terminal 2** (Frontend) - Must stay running

### To Stop the Servers:

- Press `Ctrl + C` in each terminal window
- Or just close the terminal windows

### To Restart:

- Just run the commands again:
  - Terminal 1: `cd backend` → `npm start`
  - Terminal 2: `cd frontend` → `npm run dev`

---

## 🐛 If Something Goes Wrong

### "Port already in use" error:

- Something is already using port 5000 or 3000
- Close other applications or restart your computer

### "Cannot find module" error:

- Run `npm install` in that folder again

### Backend shows "offline" in the website:

- Make sure Terminal 1 is running with `npm start`
- Visit `http://localhost:5000/api/health` - should show JSON

---

## 📋 Quick Command Reference

```powershell
# Terminal 1 - Backend
cd C:\Users\pinch\OneDrive\Desktop\AI-Summarizer\backend
npm install          # Only needed once
npm start           # Run this every time

# Terminal 2 - Frontend
cd C:\Users\pinch\OneDrive\Desktop\AI-Summarizer\frontend
npm install          # Only needed once
npm run dev         # Run this every time
```

---

**Need more help? Check README.md for detailed troubleshooting!**
