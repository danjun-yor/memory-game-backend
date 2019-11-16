import jwt from "jsonwebtoken";

const APP_SECRET = "awesome-memory-game";

function getUser(token: string) {
  const user = jwt.verify(token, APP_SECRET);

  return user;
}

export { APP_SECRET, getUser };
