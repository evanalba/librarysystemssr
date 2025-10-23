import myknex from "../database.mjs";
import bcrypt from "bcrypt";

export async function registerUser(username, password, role) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await myknex("users").insert({
      username: username,
      password: hashedPassword,
      role: role,
    });
  } catch {
    throw new Error("User with that username already exists. Please choose another.");
  }
}
