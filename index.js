import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

//define graphQL schema
const typeDefs = gql`
  type Todo {
    id: Int
    todo: String
    completed: Boolean
  }
  type Product {
    id: Int
    title: String
    price: Float
    description: String
  }
  type Query {
    todos: [Todo]
    todo(id: Int!): Todo
    products: [Product]
    product(id: Int!): Product
  }
`;

//define resolvers
const resolvers = {
  Query: {
    todos: async () => {
      const response = await fetch("https://dummyjson.com/todos");
      const data = await response.json();
      return data.todos;
    },
    products: async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      return data.products;
    },
    product: async (_, { id }) => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      return data;
    },
    todo: async (_, { id }) => {
      const response = await fetch(`https://dummyjson.com/todos/${id}`);
      const data = await response.json();
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
