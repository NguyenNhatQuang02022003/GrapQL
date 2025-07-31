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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookResolver = void 0;
const book_model_1 = require("../model/book.model");
exports.bookResolver = {
    Query: {
        books: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, book_model_1.getAllBooks)(); }),
        book: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield (0, book_model_1.getBookById)(id); }),
    },
    Mutation: {
        addBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { title, author }) {
            return yield (0, book_model_1.createBook)(title, author);
        }),
        deleteBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield (0, book_model_1.deleteBook)(id);
        }),
        updateBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, title, author }) {
            return yield (0, book_model_1.updateBook)(id, title, author);
        })
    }
};
