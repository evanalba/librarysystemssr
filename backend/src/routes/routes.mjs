import express from 'express';

const router = express.Router()

router.get("/", (req, res) => {
  // Express finds the file at /code/views/layouts/main.ejs to send to the client
  res.render('layouts/main');
});

router.get("/healthz", (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

export default router;
