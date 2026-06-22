require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const historyRoutes = require('./routes/historyRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize database connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger for development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/history', historyRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy and running' });
});

// Production Setup - Serve static files from client if directory exists
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// For any route that doesn't match API, serve client's index.html in production
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientBuildPath, 'index.html'), (err) => {
    if (err) {
      // If build folder does not exist, send a friendly API welcome page
      res.status(200).send(`
        <html>
          <head><title>MERN Weather App API</title></head>
          <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 90vh; background-color: #0f172a; color: #f8fafc;">
            <h1>MERN Weather App Backend</h1>
            <p>API status: <span style="color: #22c55e; font-weight: bold;">Online</span></p>
            <p>To run the frontend, start the Vite dev server inside <code>/client</code> or build it using <code>npm run build</code>.</p>
          </body>
        </html>
      `);
    }
  });
});

// Global Error Handler
app.use(errorHandler);

// Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
