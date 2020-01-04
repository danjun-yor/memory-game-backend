import { ApolloServer, gql, AuthenticationError } from "apollo-server";
import schema from "./schema";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { parseToken } from "./utils";

const server = new ApolloServer({
  schema,
  context: ({ req }: ExpressContext) => {
    const token = req.headers.authorization || "";

    if (token) {
      return parseToken(token.split(" ")[1]);
    } else {
      return {
        id: "",
        recordId: ""
      };
    }
  },
  debug: false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
