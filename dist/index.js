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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema/schema"));
const book_model_1 = require("./model/book.model");
const app = (0, express_1.default)();
// CORS cho phép frontend từ localhost:3000 gọi tới
app.use((0, cors_1.default)());
// Kết nối MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/bookstore')
    .then(() => console.log('✅ Kết nối MongoDB thành công'))
    .catch(err => console.error('❌ Lỗi MongoDB:', err));
// Root resolver cho GraphQL
const root = {
    books: () => __awaiter(void 0, void 0, void 0, function* () { return yield book_model_1.Book.find(); }),
    book: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) { return yield book_model_1.Book.findById(id); }),
    addBook: (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, author }) {
        const newBook = new book_model_1.Book({ title, author });
        return yield newBook.save();
    }),
    deleteBook: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
        return yield book_model_1.Book.findByIdAndDelete(id);
    }),
    updateBook: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, title, author }) {
        const updatedFields = {};
        if (title !== undefined)
            updatedFields.title = title;
        if (author !== undefined)
            updatedFields.author = author;
        return yield book_model_1.Book.findByIdAndUpdate(id, updatedFields, { new: true });
    })
};
// GraphQL endpoint
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    rootValue: root,
    graphiql: true,
}));
// Khởi động server
app.listen(4000, () => {
    console.log('🚀 Server GraphQL chạy tại http://localhost:4000/graphql');
});
