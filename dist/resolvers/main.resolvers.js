"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootResolver = void 0;
// resolvers/index.ts
const user_resolver_1 = require("./user.resolver");
const book_resolver_1 = require("./book.resolver");
exports.rootResolver = Object.assign(Object.assign({}, user_resolver_1.userresolve), book_resolver_1.bookResolver);
