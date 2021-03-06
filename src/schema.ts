import path from "path";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.ts"));

export default makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});
