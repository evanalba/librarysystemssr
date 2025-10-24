import myknex from "../database.mjs";
import bcrypt from "bcrypt";

export async function registerUser(username, password, role) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const userId = await myknex("users").insert({
    username: username,
    password: hashedPassword,
    role: role,
  });

  if (userId) {
    return;
  }
  throw new Error(
    "User with that username already exists. Please choose another."
  );
}

export async function loginUser(username, password) {
  const user = await myknex("users").where({ username: username }).first();

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return;
    }
  }
  throw new Error("Invalid username or password. Please try again.");
}
