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

export async function isCheckedOut(userId, bookId) {
  if (userId) {
    const checkedOut = await myknex("loans")
      .where({ user_id: userId, book_id: bookId })
      .first();
    if (checkedOut) {
      return true;
    }
  }
  return false;
}

export async function checkout(userId, bookId) {
  const formatToMySQLDate = (dateObject) => {
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const date = new Date();
  const loanDate = formatToMySQLDate(date);
  const days = 56;
  date.setDate(date.getDate() + days);
  const dueDate = formatToMySQLDate(date);

  // Ensures atomicity/consistency
  await myknex.transaction(async () => {
    const book = await myknex("books").where({ id: bookId }).first();

    // https://www.dremio.com/wiki/concurrency-control/
    // For the whole transaction: FOR UPDATE ensures Concurrency Control  
    const availableCopy = await myknex("copies")
      .where({ book_id: book.id, status: "Available" })
      .first()
      .forUpdate();

    await myknex("loans").insert({
      user_id: userId,
      book_id: book.id,
      copy_id: availableCopy.copy_id,
      loan_date: loanDate,
      due_date: dueDate,
    });

    await myknex("copies").where(availableCopy).update({
      status: "Checked Out",
    });
  });

  return true;
}
