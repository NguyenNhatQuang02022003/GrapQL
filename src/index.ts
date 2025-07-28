import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import { Book } from './model/book.model';

const app = express();

// CORS cho phép frontend từ localhost:3000 gọi tới
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Lỗi MongoDB:', err));

// Root resolver cho GraphQL
const root = {
  books: async () => await Book.find(),
  book: async ({ id }: { id: string }) => await Book.findById(id),
  addBook: async ({ title, author }: { title: string; author: string }) => {
    const newBook = new Book({ title, author });
    return await newBook.save();
  },
  deleteBook: async ({ id }: { id: string }) => {
    return await Book.findByIdAndDelete(id);
  },
  updateBook: async ({ id, title, author }: { id: string; title?: string; author?: string }) => {
    const updatedFields: any = {};
    if (title !== undefined) updatedFields.title = title;
    if (author !== undefined) updatedFields.author = author;
    return await Book.findByIdAndUpdate(id, updatedFields, { new: true });
  }
};

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// Khởi động server
app.listen(4000, () => {
  console.log('🚀 Server GraphQL chạy tại http://localhost:4000/graphql');
});
