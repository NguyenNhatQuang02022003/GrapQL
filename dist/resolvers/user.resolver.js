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
exports.userResolvers = void 0;
const user_model_1 = require("../model/user.model");
exports.userResolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, user_model_1.getAllUsers)(); }),
        user: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield (0, user_model_1.getUserById)(id); }),
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) { return yield (0, user_model_1.createUser)(input); }),
        updateUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, input }) { return yield (0, user_model_1.updateUser)(id, input); }),
        deleteUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield (0, user_model_1.deleteUser)(id); }),
    },
};
