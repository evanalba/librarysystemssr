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

import ejs from "ejs"

// Define the views directory (assuming your EJS templates are in a 'views' folder)
// Note: When using ES modules, __dirname and __filename is not directly available.
// You can get it using import.meta.url and path.dirname.
import path from "path";
import { fileURLToPath } from "url";


const app = express();

app.use(morgan("common"));

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Tell Express where to find your views folder (templates)
app.set('views', path.join(__dirname, '..', 'views'));

app.get("/", (req, res) => {
  // Express finds the file at /code/views/layouts/main.ejs to send to the client
  res.render('layouts/main');
});

app.get("/healthz", (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

export default app;
