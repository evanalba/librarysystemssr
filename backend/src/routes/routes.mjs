import express from 'express';

const router = express.Router()
const systemName = " | Library Management System"
const pagesDir = "../pages/"

router.get("/", (req, res) => {
  // Express finds the file in /code/views/layouts/ to send to the client
  res.render("layouts/layout-main", {title: `Home${systemName}`, cssPage: "home.css", page: `${pagesDir}home/home.ejs`});
});

router.get("/healthz", (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

export default router;
