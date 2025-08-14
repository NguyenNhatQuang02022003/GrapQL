import prisma from '../../schema/prisma-client';

export const getAllBooks = async () => {
  return await prisma.book.findMany();
};

export const getBookById = async (id: string) => {
  return await prisma.book.findUnique({
    where: { id }
  });
};

export const createBook = async (title: string, author: string, userId: string) => {
  return await prisma.book.create({
    data: { title, author, userId }
  });
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
