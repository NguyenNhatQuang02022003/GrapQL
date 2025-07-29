"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const book_schema_1 = require("./schema/book.schema");
const user_schema_1 = require("./schema/user.schema");
const book_resolver_1 = require("./resolvers/book.resolver");
const user_resolver_1 = require("./resolvers/user.resolver");
const typeDefs = [book_schema_1.bookTypeDefs, user_schema_1.userTypeDefs];
const resolvers = {
    Query: Object.assign(Object.assign({}, book_resolver_1.bookResolver.Query), user_resolver_1.userResolvers.Query),
    Mutation: Object.assign(Object.assign({}, book_resolver_1.bookResolver.Mutation), user_resolver_1.userResolvers.Mutation)
};
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers
});
