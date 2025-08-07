import {  getAllBooks,  getBookById,  createBook,  deleteBook,  updateBook} from '../types/book';

export const bookResolver = {
  Query: {
    books: async () => await getAllBooks(),
    book: async (_: any, { id }: { id: string }) => await getBookById(id),
  },
  Mutation: {
    addBook: async (_: any, { title, author }: { title: string; author: string }) => {
      return await createBook(title, author);
    },
    deleteBook: async (_: any, { id }: { id: string }) => {
      return await deleteBook(id);
    },
    updateBook: async (_: any, { id, title, author }: { id: string, title?: string, author?: string }) => {
      return await updateBook(id, title, author);
    }
  }
}
