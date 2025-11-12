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
    "User with that username already exists. Please choose another.",
  );
}

export async function loginUser(username, password) {
  const user = await myknex("users").where({ username: username }).first();

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }
  throw new Error("Invalid username or password. Please try again.");
}

export async function getAvailableCount(bookId) {
  const [{ available_count }] = await myknex("copies")
    .where({ book_id: bookId, status: "Available" })
    .count({ available_count: "*" });

  return Number(available_count);
}

export async function getTotalCount(bookId) {
  const [{ total_count }] = await myknex("copies")
    .where({ book_id: bookId })
    .count({ total_count: "*" });

  return Number(total_count);
}

export async function isCheckedOut(userId) {
  if (userId) {
    const checkedOut = await myknex("loans").where({ user_id: userId }).first();
    if (checkedOut) {
      return true;
    }
  }
  return false;
}

export async function checkout(userId, bookId) {
  // Update book copy count down
  // console.log(((await myknex("books").where({ id: bookId }).select("available_copies"))[0]).available_copies);
  // console.log(await myknex("books").where({ id: bookId }));

  // await myknex("books")
  //   .where({ id: bookId })
  //   .decrement({ available_copies: 1 });
  // Insert new loan
  const record = await myknex("books").where({ id: bookId });
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  // console.log(formattedDate); // Example output: 11/11/2025

  // await myknex("loans").insert({
  //   user_id : userId,
  //   book_id : (record[0]).bookId,
  //   loan_date: formattedDate,
  //   due_date})

  // const checkout = await myknex("books")
}
