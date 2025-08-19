# Sử dụng Node 18 Alpine nhẹ
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json để tận dụng cache layer
COPY package*.json ./

# Cài dependencies
RUN npm install

# Cài wait-port để chờ Mongo sẵn sàng
RUN npm install wait-port --global

# Copy toàn bộ code vào container
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=src/config/schema.prisma

# Build TypeScript (nếu có)
RUN npm run build

# Expose port GraphQL
EXPOSE 4000

# Lệnh chạy container: chờ Mongo sẵn sàng rồi chạy server
CMD ["sh", "-c", "wait-port mongo1_rs:27017 && npm start"]
