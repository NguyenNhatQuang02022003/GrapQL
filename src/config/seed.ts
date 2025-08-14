import { PrismaClient, UserRole } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Xóa dữ liệu cũ
  await prisma.user.deleteMany({})
  await prisma.book.deleteMany({})

  // Seed Users
  const users = [
    { name: 'Nguyen Van A', dob: new Date('1990-01-01'), email: 'a@example.com', password: '123456', role: UserRole.user },
    { name: 'Tran Thi B', dob: new Date('1992-02-15'), email: 'b@example.com', password: '123456', role: UserRole.admin },
    { name: 'Le Van C', dob: new Date('1995-03-20'), email: 'c@example.com', password: '123456', role: UserRole.superadmin },
    { name: 'Pham Thi D', dob: new Date('1988-11-05'), email: 'd@example.com', password: '123456', role: UserRole.user },
    { name: 'Hoang Van E', dob: new Date('1993-06-10'), email: 'e@example.com', password: '123456', role: UserRole.user },
    { name: 'Bui Thi F', dob: new Date('1991-07-12'), email: 'f@example.com', password: '123456', role: UserRole.admin },
    { name: 'Do Van G', dob: new Date('1996-08-18'), email: 'g@example.com', password: '123456', role: UserRole.user },
    { name: 'Ngo Thi H', dob: new Date('1994-09-22'), email: 'h@example.com', password: '123456', role: UserRole.superadmin },
    { name: 'Nguyen Nhat Quang',dob: new Date('2003-02-02'),email: 'nhtquangnguyen645@gmail.com.com',password: '12345678',role: UserRole.superadmin,createdAt: new Date('2025-08-04T08:43:25.709Z'),updatedAt: new Date('2025-08-04T09:19:22.739Z')}
  ]

  const createdUsers = await prisma.user.createMany({ data: users })

  // Seed Books
  const books = [
    { title: 'Lập trình C++ cơ bản', author: 'Nguyen Van A' },
    { title: 'Java cho người mới bắt đầu', author: 'Tran Thi B' },
    { title: 'Học Python trong 30 ngày', author: 'Le Van C' },
    { title: 'ReactJS từ Zero đến Hero', author: 'Pham Thi D' },
    { title: 'Node.js nâng cao', author: 'Hoang Van E' },
    { title: 'Thuật toán và cấu trúc dữ liệu', author: 'Bui Thi F' },
    { title: 'C# cho lập trình viên', author: 'Do Van G' },
    { title: 'Prisma ORM toàn tập', author: 'Ngo Thi H' }
  ]

  const createdBooks = await prisma.book.createMany({ data: books })

  console.log(`✅ Seeded ${createdUsers.count} users`)
  console.log(`✅ Seeded ${createdBooks.count} books`)
}

main()
  .then(() => console.log('🎉 Seed completed'))
  .catch(err => console.error('❌ Error seeding data:', err))
  .finally(() => prisma.$disconnect())
