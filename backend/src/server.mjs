// A simple node web server optimized for Docker image

import express from "express";
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

import morgan from "morgan";
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

// Allow us to write SQL queries using JavaScript code instead of raw SQL strings
import { raw } from "./database.mjs";

import { port } from "./config.mjs";

// Appi
const app = express();

app.use(morgan("common"));

app.get("/", function (req, res, next) {
  raw("select VERSION() version")
    .then(([rows, columns]) => rows[0])
    .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

app.get("/healthz", function (req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

const listen = () => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

// export default app;
export { app, listen };
