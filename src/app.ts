import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

// Configure environment variables
dotenv.config({ path: './src/config/.env' });

// Import database connection
import connectDB from './configs/database';

// Import routers
import { userRouter } from './routes/user.route';
import { adminRouter } from './routes/admin.router';
import { instructorRouter } from './routes/instructor.router';
import { sharedRouter } from './routes/shared.router';

// Create Express app
const app = express();

// Database connection
connectDB();

// Middleware configurations
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Router middleware
app.use('/student', userRouter);
app.use('/admin', adminRouter);
app.use('/instructor', instructorRouter);
app.use('/shared', sharedRouter);



// Server and Socket.IO setup
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  },
});

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

const chatRooms = new Map<string, ChatMessage[]>();

io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinPrivateChat', ({ chatRoomId }: { chatRoomId: string; courseId: string }) => {
    socket.join(chatRoomId);
    const previousMessages = chatRooms.get(chatRoomId) || [];
    socket.emit('previousMessages', previousMessages);
    console.log(`User ${socket.id} joined chat room: ${chatRoomId}`);
  });

  socket.on('chatMessage', (data: { chatRoomId: string; sender: string; message: string; timestamp: string }) => {
    const { chatRoomId, sender, message, timestamp } = data;
    const messageData = { sender, message, timestamp, chatRoomId }; 

    if (!chatRooms.has(chatRoomId)) {
      chatRooms.set(chatRoomId, []);
    }
    chatRooms.get(chatRoomId)!.push(messageData);

    io.to(chatRoomId).emit('chatMessage', messageData);
    console.log(`Message sent to ${chatRoomId}:`, messageData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('error', (error: Error) => {
    console.error('Socket error:', error);
  });
});

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running... http://localhost:${port}`);
});

export default app;
