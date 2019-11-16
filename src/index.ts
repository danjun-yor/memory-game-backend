import { ApolloServer, gql } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: ExpressContext) => {
    Authorization: req.get("Authorization");
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
