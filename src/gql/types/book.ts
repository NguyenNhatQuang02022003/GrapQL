import prisma from '../../prisma-client';

export const getAllBooks = async () => {
  return await prisma.book.findMany();
};

export const getBookById = async (id: string) => {
  return await prisma.book.findUnique({
    where: { id }
  });
};

export const createBook = async (title: string, author: string, userId: string) => {
  const existingBook = await prisma.book.findFirst({
    where: {
      title,
      author
    }
  });
  if (existingBook) {
    throw new Error(`Sách với title "${title}" và author "${author}" đã tồn tại.`);
  }

  try {
    return await prisma.book.create({
      data: { title, author, userId }
    });
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error(`Sách với title "${title}" và author "${author}" đã tồn tại.`);
    }
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  return await prisma.book.delete({
    where: { id }
  });
};

export const updateBook = async (
  id: string,
  title?: string,
  author?: string
) => {
  return await prisma.book.update({
    where: { id },
    data: { title, author }
  });
};
