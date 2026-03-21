const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust for production
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const doubtRoutes = require('./routes/doubtRoutes');
const aiRoutes = require('./routes/aiRoutes');
const youtubeRoutes = require('./routes/youtubeRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/doubts', doubtRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/users', userRoutes);

// Socket.io Real-time Setup
io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id);

  // Join private room for a doubt session
  socket.on('join_doubt_room', (doubtId) => {
    socket.join(`room_${doubtId}`);
    console.log(`Socket ${socket.id} joined room_${doubtId}`);
  });

  // Chat message
  socket.on('chat:message', ({ doubtId, sender, text }) => {
    io.to(`room_${doubtId}`).emit('chat:message', { sender, text, timestamp: Date.now() });
  });

  // WebRTC Signaling
  socket.on('webrtc:signal', ({ doubtId, signalData }) => {
    // Forward signaling data to others in the room
    socket.to(`room_${doubtId}`).emit('webrtc:signal', { signalData });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Main App Exports
module.exports = { app, server, io };
