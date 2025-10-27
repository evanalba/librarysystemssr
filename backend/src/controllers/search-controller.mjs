import myknex from "../database.mjs";

async function getBooks(searchTerm) {
  const searchPattern = `%${searchTerm}%`;
  let query = myknex("books").where(function() {
          this.where("title", "like", searchPattern)
              .orWhere("authors", "like", searchPattern);
      });;

  const books = await query.orderBy("title", "asc");
  if (books) {
    return books;
  }

  throw new Error("Could not retrieve books from the database.");
}

export default getBooks;
