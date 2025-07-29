import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
const app = express();

app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Lỗi MongoDB:', err));

// Sử dụng schema đã gộp
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('🚀 Server GraphQL chạy tại http://localhost:4000/graphql');
});
