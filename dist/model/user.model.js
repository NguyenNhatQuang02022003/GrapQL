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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const prisma_client_1 = __importDefault(require("../prisma-client"));
const allowedRoles = ['user', 'admin'];
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
    return yield prisma_client_1.default.user.create({
        data: {
            name: input.name,
            dob: new Date(input.dob),
            email: input.email,
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
