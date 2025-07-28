"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema/schema"));
const book_resolver_1 = require("./resolvers/book.resolver");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
mongoose_1.default.connect('mongodb://localhost:27017/bookstore')
    .then(() => console.log('✅ Kết nối MongoDB thành công'))
    .catch(err => console.error('❌ Lỗi MongoDB:', err));
// Sử dụng bookResolver làm rootValue
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    rootValue: book_resolver_1.bookResolver,
    graphiql: true,
}));
app.listen(4000, () => {
    console.log('🚀 Server GraphQL chạy tại http://localhost:4000/graphql');
});
