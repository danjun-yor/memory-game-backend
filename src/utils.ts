import jwt from "jsonwebtoken";
import { APP_SECRET } from "./secret";

function getUser(token: string) {
  const user = jwt.verify(token, APP_SECRET);

  return user;
}

export { APP_SECRET, getUser };
