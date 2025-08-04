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
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_client_1 = __importDefault(require("./prisma-client"));
const auth_1 = require("./utils/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)((req) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const user = token ? (0, auth_1.getUserFromToken)(token) : null;
    return {
        schema: schema_1.schema,
        graphiql: true,
        context: { user },
    };
}));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server GraphQL chạy tại http://localhost:${PORT}/graphql`);
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_client_1.default.$disconnect();
    process.exit();
}));
