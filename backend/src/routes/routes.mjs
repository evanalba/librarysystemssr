import express from "express";
import myknex from "../database.mjs";
import { loginUser, registerUser } from "../controllers/user-controller.mjs";
import getBooks from "../controllers/search-controller.mjs";
import asyncHandler from "../middleware/async-handler.mjs";
import { SESSION_COOKIE_NAME } from "../config.mjs";

// Server-side Validation for Forms
import { validationResult } from "express-validator";
import { registerValidationRules } from "../validation/auth.mjs";

const router = express.Router();
const systemName = " | Library Management System";
const pagesDir = "../pages/";

router.get("/", (_req, res) => {
  // Express finds the file in /code/views/layouts/ to send to the client
  res.render("layouts/layout-main", {
    title: `Home${systemName}`,
    cssPage: "home.css",
    page: `${pagesDir}home/home.ejs`,
  });
});

router.get("/healthz", (_req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

router.get(
  "/booklist",
  asyncHandler(async (req, res) => {
    const searchTerm = req.query.q || "";
    const books = await getBooks(searchTerm);

    res.render("layouts/layout-main", {
      title: `Booklist${systemName}`,
      cssPage: "booklist.css",
      page: `${pagesDir}booklist/booklist.ejs`,
      books: books,
      searchTerm: searchTerm,
    });
  }),
);

router.get(
  "/books/:id",
  asyncHandler(async (req, res, next) => {
    const bookId = req.params.id;
    const book = await myknex("books").where("id", bookId).first();

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
  }),
);

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.flash("error", "You must be logged in to view this page.");
    res.redirect("/login");
  }
}

router.get(
  "/pdashboard",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    // TODO FIX HERE!
    // const userId = req.session.user ? req.session.user.id : null;

    // Fetch data relevant to the specific user (e.g., their borrowed books)
    // const borrowedBooks = await getBorrowedBooks(user.id);

    res.render("layouts/layout-main", {
      title: `Patron Dashboard${systemName}`,
      cssPage: "patron-dashboard.css",
      page: `${pagesDir}patron-dashboard/patron-dashboard.ejs`,
      // TODO borrowed books pass in data
    });
  }),
);

router.post("/logout", (req, res, next) => {
  req.session.destroy((e) => {
    if (e) {
      res.render("layouts/layout-main", {
        title: `${systemName}`,
      });
      return next(e);
    }

    res.clearCookie(SESSION_COOKIE_NAME);
    res.redirect("/login");
  });
});

router.get("/login", async (req, res) => {
  const successMsg = req.flash("success");
  const errorMsg = req.flash("error");

  res.render("layouts/main", {
    title: `Home${systemName}`,
    cssPage: "login.css",
    page: `${pagesDir}login/login.ejs`,
    successMsg: successMsg.length > 0 ? successMsg[0] : null,
    errorMsg: errorMsg.length > 0 ? errorMsg[0] : null,
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body.username, req.body.password);
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    user.role === "patron" ? res.redirect("/pdashboard") : res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/login");
  }
});

router.get("/register", async (req, res) => {
  const errorMsg = req.flash("error");

  res.render("layouts/main", {
    title: `Home${systemName}`,
    cssPage: "register.css",
    page: `${pagesDir}register/register.ejs`,
    errorMsg: errorMsg.length > 0 ? errorMsg[0] : null,
  });
});

router.post("/register", registerValidationRules, async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      await registerUser(req.body.username, req.body.password, req.body.role);
      req.flash("success", "Proceed to login.");
      res.redirect("/login");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  } else {
    req.flash("error", errors.array()[0].msg);
    res.redirect("/register");
  }
});

export default router;
