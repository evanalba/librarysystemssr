const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles"
  });
  console.error(formattedTime);
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
