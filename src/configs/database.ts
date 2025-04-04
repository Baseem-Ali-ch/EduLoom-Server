// src/configs/database.ts

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if MongoDB URI is defined
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables. Please check your .env file.');
    }
    
    // Connect with mongoose
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect MongoDB:', error);
    // Don't exit the process, just log the error
    // process.exit(1); - removing this to prevent app from crashing
  }
};

export default connectDB;