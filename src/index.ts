import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import { bookResolver } from './resolvers/book.resolver'; 

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Lỗi MongoDB:', err));

// Sử dụng bookResolver làm rootValue
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: bookResolver,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('🚀 Server GraphQL chạy tại http://localhost:4000/graphql');
});
