import jwt from "jsonwebtoken";
import { APP_SECRET } from "./secret";
import { User, GameRecord } from "../generated/prisma-client";

type Token = {
  id: string;
  recordId: string;
};

function parseToken(token: string) {
  return { id: "", recordId: "", ...(<Token>jwt.verify(token, APP_SECRET)) };
}

export { APP_SECRET, parseToken };
