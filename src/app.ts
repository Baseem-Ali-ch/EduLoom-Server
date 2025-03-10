import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

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
// app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST','PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app.use(
//   '/uploads',
//   express.static(path.join(__dirname, 'public/assets/uploads'))
// );

// Router middleware
app.use('/student', userRouter);
app.use('/admin', adminRouter);
app.use('/instructor', instructorRouter);
app.use('/shared', sharedRouter);

// Server configuration
const port = process.env.PORT;

// Start server
app.listen(port, () => {
  console.log(`Server running... http://localhost:${port}`);
});

export default app;
