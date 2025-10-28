// A node web server optimized for Docker image
// Concerned on how the server does its routes, its logic, and its
// middleware, not with how it starts or stops.

// CRIT: By using the express web framework, we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.
import express from "express";

// Creates the user's session object.
// Note: Session data is not saved in the cookie itself, just the session ID.
// Session data is stored server-side.
import session from "express-session";

// Ensures that session object is saved to MySQL.
// NOTE: The default server-side session storage, MemoryStore,
// (from express-session) is purposely not designed for a production
// environment. It will leak memory under most conditions, does notscale past
// a single process, and is meant for debugging and developing.
import MySQLStore from "express-mysql-session";

// Writes your message (req.flash('success', 'Hi!')) into that session
// object, and then reads and deletes it on the next request.
import flash from "connect-flash";

// Define the views directory (assuming your EJS templates are in a 'views' folder)
// Note: When using ES modules, __dirname and __filename is not directly available.
// You can get it using import.meta.url and path.dirname.
import path from "path";
import { fileURLToPath } from "url";
import attachUserToLocals from "./middleware/locals-middleware.mjs"
import router from "./routes/routes.mjs";
import errorHandler from "./middleware/error-handler.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'just-for-testing',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000 // Session expires after 24 hours
    }  
}))
app.use(flash());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'public'))); 

app.set("view engine", "ejs");

// Tell Express where to find your views folder (templates)
app.set("views", path.join(__dirname, "..", "views"));
app.use(attachUserToLocals);
app.use("/", router);

// CRIT: The error handler must be the last middleware loaded!
app.use(errorHandler);

export default app;
