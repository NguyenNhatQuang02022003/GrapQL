"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const prisma_client_1 = __importDefault(require("../prisma-client"));
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.book.findMany();
});
exports.getAllBooks = getAllBooks;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.book.findUnique({
        where: { id }
    });
});
exports.getBookById = getBookById;
const createBook = (title, author) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.book.create({
        data: { title, author }
    });
});
exports.createBook = createBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.book.delete({
        where: { id }
    });
});
exports.deleteBook = deleteBook;
const updateBook = (id, title, author) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.book.update({
        where: { id },
        data: { title, author }
    });
});
exports.updateBook = updateBook;
