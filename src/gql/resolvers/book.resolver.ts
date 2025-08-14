import { 
  getAllBooks,  
  getBookById,  
  createBook,  
  deleteBook,  
  updateBook 
} from '../types/book';
import prisma from '../../schema/prisma-client';

export const bookResolver = {
  Query: {
    books: async () => await getAllBooks(),
    book: async (_: any, { id }: { id: string }) => await getBookById(id),
  },

  Mutation: {
    addBook: async (_: any, { title, author, userId }: { title: string; author: string; userId: string }) => {
      return await createBook(title, author, userId);
    },
    deleteBook: async (_: any, { id }: { id: string }) => {
      return await deleteBook(id);
    },
    updateBook: async (_: any, { id, title, author }: { id: string, title?: string, author?: string }) => {
      return await updateBook(id, title, author);
    }
  },
  Book: {
    user: async (parent: any) => {
      return await prisma.user.findUnique({
        where: { id: parent.userId }
      });
    }
  }
};
