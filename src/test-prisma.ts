import prisma from './prisma-client';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    // Test kết nối books
    const books = await prisma.book.findMany();
    console.log('Danh sách sách:', books);

    // Test kết nối users
    const users = await prisma.user.findMany();
    console.log('Danh sách người dùng:', users);

    console.log('✅ Kết nối Prisma thành công!');
  } catch (error) {
    console.error('❌ Lỗi kết nối Prisma:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();