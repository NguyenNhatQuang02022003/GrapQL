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
        users: () => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.User.find(); }),
        user: (_, args) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.User.findById(args.id); }),
    },
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { input } = args;
            const userData = Object.assign(Object.assign({}, input), { role: input.role || 'user', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
            const newUser = new user_model_1.User(userData);
            return yield newUser.save();
        }),
        updateUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const updated = yield user_model_1.User.findByIdAndUpdate(args.id, Object.assign(Object.assign({}, args.input), { updatedAt: new Date().toISOString() }), { new: true });
            return updated;
        }),
        deleteUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield user_model_1.User.findByIdAndDelete(args.id);
        }),
    },
};
