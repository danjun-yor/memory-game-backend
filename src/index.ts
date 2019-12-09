import { ApolloServer, gql, AuthenticationError } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { getUser } from "./utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: ExpressContext) => {
    const token = req.headers.authorization || "";

    if (token) {
      const user = getUser(token.split(" ")[1]);

      return user;
    } else {
      return {};
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
