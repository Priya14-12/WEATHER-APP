const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid database resource identifier.`;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
