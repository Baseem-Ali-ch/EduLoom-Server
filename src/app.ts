// src/app.ts

import express from 'express';
// Choose one body parser approach
// import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

// Load environment variables FIRST, before other imports
// This is important so the database connection can access the variables
dotenv.config({ path: './src/config/.env' });

// Import database connection
import connectDB from './configs/database';

// Import routers
import { userRouter } from './routes/user.route';
import { adminRouter } from './routes/admin.router';
import { instructorRouter } from './routes/instructor.router';
import { sharedRouter } from './routes/shared.router';
import Chat from './models/Chat';

// Create Express app
const app = express();

// Middleware configurations
app.use(morgan('dev'));
app.use(cookieParser());

// BODY PARSER - CHOOSE ONLY ONE OF THESE APPROACHES:
// Approach 1: Express built-in parsers (recommended)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Approach 2: Body-parser package (remove if using Approach 1)
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['https://eduloom.fun', 'https://www.eduloom.fun', 'http://localhost:4200'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  })
);

// Connect to MongoDB
try {
  connectDB();
  console.log('MongoDB connection successful');
} catch (error) {
  console.error('Failed to connect to MongoDB:', error);
  // Don't exit the process, but log the error
}

// Router middleware
app.use('/student', userRouter);
app.use('/admin', adminRouter);
app.use('/instructor', instructorRouter);
app.use('/shared', sharedRouter);

// Server and Socket.IO setup
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://eduloom.fun', 'http://localhost:4200'],
    credentials: true,
  },
});

io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinPrivateChat', async ({ chatRoomId }) => {
    try {
      socket.join(chatRoomId);
      console.log(`User ${socket.id} joined room: ${chatRoomId}`);

      // Find or create chat room
      let chatRoom = await Chat.findOne({ chatRoomId });

      // Send previous messages if room exists
      if (chatRoom) {
        // Only send the messages array to save bandwidth
        socket.emit(
          'previousMessages',
          chatRoom.messages.map((msg) => ({
            sender: msg.sender,
            message: msg.message,
            timestamp: msg.timestamp.toISOString(),
            chatRoomId,
          }))
        );
      }
    } catch (error) {
      console.error('Error in joinPrivateChat:', error);
    }
  });

  socket.on('chatMessage', async (data) => {
    try {
      const { chatRoomId, sender, message, tempId } = data;
      if (!chatRoomId || !sender || !message) {
        console.error('Missing required chat data');
        return;
      }

      // Get the participant IDs from the chatRoomId
      const participants = chatRoomId.split('_').map((id: string) => id.replace(/[^a-zA-Z0-9]/g, ''));

      // Create the new message
      const newMessage = {
        sender,
        message,
        timestamp: new Date(),
      };

      // Update or create the chat room document
      const chatRoom = await Chat.findOneAndUpdate(
        { chatRoomId },
        {
          $push: { messages: newMessage },
          $set: { lastUpdated: new Date() },
          $setOnInsert: { participants },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
      console.log(chatRoom);

      // Important: Log the room status for debugging
      const roomSockets = io.sockets.adapter.rooms.get(chatRoomId);
      console.log(`Broadcasting to room ${chatRoomId}, sockets in room: ${roomSockets ? roomSockets.size : 0}`);

      // Broadcast to ALL clients in the room
      const messageToSend = {
        chatRoomId,
        sender: newMessage.sender,
        message: newMessage.message,
        timestamp: newMessage.timestamp.toISOString(),
        tempId, // Pass back the tempId if it exists
      };

      // Use io.to, not socket.to, to include the sender
      io.to(chatRoomId).emit('chatMessage', messageToSend);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('error', (error: Error) => {
    console.error('Socket error:', error);
  });
});

// Error handling middleware
app.use((err: any, req:any, res:any, next:any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running... http://localhost:${port}`);
});

export default app;
