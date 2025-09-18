// A node web server optimized for Docker image
// Concerned on how the server does its routes, its logic, and its
// middleware, not with how it starts or stops.

// CRIT: By using the express web framework, we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.
import express from "express";

// Morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.
import morgan from "morgan";

// Allow us to write SQL queries using JavaScript code instead of raw SQL strings
import { raw } from "./database.mjs";

const app = express();

app.use(morgan("common"));

app.get("/", (req, res, next) => {
  raw("select VERSION() version")
    .then(([rows, columns]) => rows[0])
    .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

app.get("/healthz", (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

export default app;
