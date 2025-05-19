// pass the fn which is the async function to be executed as parameter
// and return a function that takes req, res, and next as parameters
// the req, res are the parameters of the function that is passed to the asyncHandler
const asyncHandler = fn => (req, res, next) => {
    // call the function that is passed to the asyncHandler
    // and return a promise that resolves to the result of the function
    // if the promise is rejected, call the next function with the error
    // this will pass the error to the error middleware
    // which will handle the error and send a response to the client
    // this will also prevent the need to use try-catch in every route handler
    // and make the code cleaner and easier to read
    // this is a common pattern used in express applications
    // to handle async errors in a cleaner way
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;