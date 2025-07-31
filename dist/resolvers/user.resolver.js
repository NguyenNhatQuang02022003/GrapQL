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
exports.userResolvers = void 0;
const prisma_client_1 = __importDefault(require("../prisma-client"));
exports.userResolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma_client_1.default.user.findMany(); }),
        user: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield prisma_client_1.default.user.findUnique({ where: { id } }); }),
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const allowedRoles = ['user', 'admin'];
            const role = input.role || 'user';
            if (!allowedRoles.includes(role)) {
                throw new Error(`Invalid role. Allowed roles are: ${allowedRoles.join(', ')}`);
            }
            return yield prisma_client_1.default.user.create({
                data: {
                    name: input.name,
                    dob: new Date(input.dob),
                    email: input.email,
                    role: role,
                },
            });
        }),
        updateUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, input }) {
            const allowedRoles = ['user', 'admin'];
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
        }),
        deleteUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield prisma_client_1.default.user.delete({
                where: { id },
            });
        }),
    },
};
