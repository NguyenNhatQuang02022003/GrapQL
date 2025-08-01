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
const prisma_client_1 = __importDefault(require("./prisma-client"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Test kết nối books
            const books = yield prisma_client_1.default.book.findMany();
            console.log('Danh sách sách:', books);
            // Test kết nối users
            const users = yield prisma_client_1.default.user.findMany();
            console.log('Danh sách người dùng:', users);
            console.log('✅ Kết nối Prisma thành công!');
        }
        catch (error) {
            console.error('❌ Lỗi kết nối Prisma:', error);
        }
        finally {
            yield prisma_client_1.default.$disconnect();
        }
    });
}
testConnection();
