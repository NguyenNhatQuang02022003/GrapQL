// resovers/book.resolver.ts
import { Book } from '../model/book.model';

export const bookResolver = {
  Query: {
    books: async () => await Book.find(),
    book: async ({ id }: { id: string }) => await Book.findById(id),
  },
  Mutation: {
    addBook: async ({ title, author }: { title: string; author: string }) => {
      const book = new Book({ title, author });
      return await book.save();
    },
    deleteBook: async ({ id }: { id: string }) => {
      return await Book.findByIdAndDelete(id);
    },
    updateBook: async ({ id, title, author }: { id: string, title?: string, author?: string }) => {
      return await Book.findByIdAndUpdate(id, { title, author }, { new: true });
    }
  }
};
