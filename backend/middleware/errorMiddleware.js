// handle the case that the route does not exist
// throw an error manually and pass it to the errorHandler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// the destination of the next function
// the errors of all functions and middleware goes to this function eventually
const errorHandler = (err, req, res, next) => {
  // if the error is manually thrown, and the status is not set,
  // then go to this line and set the status code to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // the purpose of this clause is handling the case that the id FORMAT IS NOT VALID
  // triggers the CastError, then we need to set the status code to 404
  // determine the difference of here and the previous 404 in the productRoutes.js,
  // which is the case that the format is valid, but the id is not found in the database
  if(err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });

}
export { notFound, errorHandler };