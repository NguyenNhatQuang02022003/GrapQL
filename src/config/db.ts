import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Đọc biến môi trường từ file .env

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || '';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
