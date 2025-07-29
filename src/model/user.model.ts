import mongoose, { Document, Schema } from 'mongoose';

// Định nghĩa interface cho TypeScript
export interface IUser extends Document {
  name: string;
  dob: Date;
  email: string;
  role: 'user' | 'admin'; // Chỉ cho phép 2 giá trị
}

// Tạo Schema
const UserSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Tên là bắt buộc'] 
  },
  dob: { 
    type: Date, 
    required: [true, 'Ngày sinh là bắt buộc'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email là bắt buộc'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Chỉ cho phép 2 role
    default: 'user', // Mặc định là user
    required: true
  }
}, {
  timestamps: true
});

// Tạo model từ Schema
export const User = mongoose.model<IUser>('User', UserSchema);