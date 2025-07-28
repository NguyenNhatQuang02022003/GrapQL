// resovers/book.resolver.ts
import { Book } from '../model/book.model';

export const bookResolver = {
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
