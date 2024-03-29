import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  err.message = err.message;

  //? Logs to console for developers to see
  console.log(err.stack.red);

  //? Mongoose bad objectId

  if (err.name === 'CastError') {
    const message = `Resource  not found  with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
