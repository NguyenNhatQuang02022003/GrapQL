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
exports.changePassword = exports.resetPassword = exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const prisma_client_1 = __importDefault(require("../prisma-client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const allowedRoles = ['user', 'admin'];
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.user.findMany();
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.user.findUnique({ where: { id } });
});
exports.getUserById = getUserById;
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const role = input.role || 'user';
    if (!allowedRoles.includes(role)) {
        throw new Error(`Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`);
    }
    const hashedPassword = yield bcrypt_1.default.hash(input.password, 10);
    return yield prisma_client_1.default.user.create({
        data: {
            name: input.name,
            dob: new Date(input.dob),
            email: input.email,
            password: hashedPassword,
            role,
        },
    });
});
exports.createUser = createUser;
const updateUser = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    if (input.role && !allowedRoles.includes(input.role)) {
        throw new Error(`Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`);
    }
    return yield prisma_client_1.default.user.update({
        where: { id },
        data: {
            name: input.name,
            dob: new Date(input.dob),
            email: input.email,
            role: input.role,
        },
    });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_client_1.default.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;
// 👇 Hàm đăng nhập người dùng
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_client_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('User not found');
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Incorrect password');
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '1d',
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
});
exports.loginUser = loginUser;
// 👇 Hàm đặt lại mật khẩu
const resetPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt_1.default.hash(newPassword, 10);
    return yield prisma_client_1.default.user.update({
        where: { email },
        data: { password: hashed },
    });
});
exports.resetPassword = resetPassword;
const changePassword = (email, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_client_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('User not found');
    const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch)
        throw new Error('Old password is incorrect');
    const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
    return yield prisma_client_1.default.user.update({
        where: { email },
        data: { password: hashedNewPassword },
    });
});
exports.changePassword = changePassword;
