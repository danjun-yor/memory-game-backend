import jwt from "jsonwebtoken";
import { APP_SECRET } from "./secret";

function getUserId(token: string) {
  return jwt.verify(token, APP_SECRET);
}

export { APP_SECRET, getUserId };
