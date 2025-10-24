// Express does not automatically catch errors thrown from asynchronous code,
// which would otherwise crash your server or leave client requests hanging.
//
// https://expressjs.com/en/guide/error-handling.html
//
// "For errors returned from asynchronous functions invoked by route handlers
// and middleware, you must pass them to the next() function, where Express
// will catch and process them."

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
