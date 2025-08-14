import { PrismaClient, UserRole } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Xóa dữ liệu cũ
  await prisma.book.deleteMany({})
  await prisma.user.deleteMany({})

  // Seed Users
  const users = [
    { name: 'Nguyen Van A', dob: new Date('1990-01-01'), email: 'a@example.com', password: '123456', role: UserRole.user },
    { name: 'Tran Thi B', dob: new Date('1992-02-15'), email: 'b@example.com', password: '123456', role: UserRole.admin },
    { name: 'Le Van C', dob: new Date('1995-03-20'), email: 'c@example.com', password: '123456', role: UserRole.admin },
    { name: 'Pham Thi D', dob: new Date('1988-11-05'), email: 'd@example.com', password: '123456', role: UserRole.user },
    { name: 'Hoang Van E', dob: new Date('1993-06-10'), email: 'e@example.com', password: '123456', role: UserRole.user },
    { name: 'Bui Thi F', dob: new Date('1991-07-12'), email: 'f@example.com', password: '123456', role: UserRole.admin },
    { name: 'Do Van G', dob: new Date('1996-08-18'), email: 'g@example.com', password: '123456', role: UserRole.user },
    { name: 'Ngo Thi H', dob: new Date('1994-09-22'), email: 'h@example.com', password: '123456', role: UserRole.admin },
    { name: 'Nguyen Nhat Quang',dob: new Date('2003-02-02'),email: 'nhtquangnguyen645@gmail.com',password: '12345678',role: UserRole.superadmin,createdAt: new Date('2025-08-04T08:43:25.709Z'),updatedAt: new Date('2025-08-04T09:19:22.739Z')}
  ]

  // Tạo user và lấy danh sách object trả về (để lấy id)
  const createdUsers = await Promise.all(users.map(user => prisma.user.create({ data: user })))

  // Seed Books với userId liên kết
  const books = [
    { title: 'Lập trình C++ cơ bản', author: 'Nguyen Van A', userId: createdUsers[0].id },
    { title: 'Java cho người mới bắt đầu', author: 'Tran Thi B', userId: createdUsers[1].id },
    { title: 'Học Python trong 30 ngày', author: 'Le Van C', userId: createdUsers[2].id },
    { title: 'ReactJS từ Zero đến Hero', author: 'Pham Thi D', userId: createdUsers[3].id },
    { title: 'Node.js nâng cao', author: 'Hoang Van E', userId: createdUsers[4].id },
    { title: 'Thuật toán và cấu trúc dữ liệu', author: 'Bui Thi F', userId: createdUsers[5].id },
    { title: 'C# cho lập trình viên', author: 'Do Van G', userId: createdUsers[6].id },
    { title: 'Prisma ORM toàn tập', author: 'Ngo Thi H', userId: createdUsers[7].id }
  ]

  const createdBooks = await prisma.book.createMany({ data: books })

  console.log(`✅ Seeded ${createdUsers.length} users`)
  console.log(`✅ Seeded ${createdBooks.count} books`)
}

main()
  .then(() => console.log('🎉 Seed completed'))
  .catch(err => console.error('❌ Error seeding data:', err))
  .finally(() => prisma.$disconnect())
