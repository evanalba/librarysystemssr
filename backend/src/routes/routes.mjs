import express from "express";
import myknex from "../database.mjs";
import errorHandler from "../middleware/error-handler.mjs";

const router = express.Router();
const systemName = " | Library Management System";
const pagesDir = "../pages/";

router.get("/", (req, res) => {
  // Express finds the file in /code/views/layouts/ to send to the client
  res.render("layouts/layout-main", {
    title: `Home${systemName}`,
    cssPage: "home.css",
    page: `${pagesDir}home/home.ejs`,
  });
});

router.get("/healthz", (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

router.get("/booklist", async (req, res) => {
  let books = [];
  try {
    books = await myknex("books").select([
      "id",
      "title",
      "authors",
      "publication_year",
      "isbn",
      "available_copies",
      "image_url",
    ]);

    res.render("layouts/layout-main", {
      title: `Booklist${systemName}`,
      cssPage: "booklist.css",
      page: `${pagesDir}booklist/booklist.ejs`,
      books: books,
    });
  } catch (error) {
    res.render("layouts/layout-main", {
      title: `Booklist${systemName}`,
      cssPage: "booklist.css",
      page: `${pagesDir}booklist/booklist.ejs`,
      books: [],
    });
  }
});

router.get("/books/:id", async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await myknex("books")
      .where("id", bookId)
      .first();

    if (!book) {
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    res.render("layouts/layout-main", {
      title: `${book.title}${systemName}`,
      cssPage: "book-detail.css",
      page: `${pagesDir}book-detail/book-detail.ejs`,
      book: book,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
