import path from 'path'; //import the path module from the Node.js core modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config(); //load the environment variables from the .env file
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; //import the notFound and errorHandler middleware functions
//import products from './data/products.js'; //import the products data from the products.js file
import productRoutes from './routes/productRoutes.js'; //import the productRoutes from the productRoutes.js file
import userRoutes from './routes/userRoutes.js'; //import the productRoutes from the productRoutes.js file
import orderRoutes from './routes/orderRoutes.js'; //import the productRoutes from the productRoutes.js file
import uploadRoutes from './routes/uploadRoutes.js'; //import the productRoutes from the productRoutes.js file
const port = process.env.PORT || 5000; //set the port to the value of the PORT environment variable or 5000 if not set

connectDB(); //connect to the MongoDB database using the connectDB function from the db.js file

const app = express();

app.use(express.json()); //use the express.json() middleware to parse the JSON data from the request body
app.use(express.urlencoded({ extended: true })); //use the express.urlencoded() middleware to parse the URL-encoded data from the request body
app.use(cookieParser()); //use the cookie-parser middleware to parse the cookies from the request


//get() listens the request from the client, when listen the '/', it will send the response 'API is running...' from the
//server side to client side, (req, res) => { } is the callback function, req is the request from the client, 
//res is the response from the server
app.get('/', (req, res) => {
  res.send('API is running...');
}
);


// normally, here it goes to the api/products route, but if there is an error,
// it will go to the errorHandler middleware function, and passed to the errorHandler function
app.use('/api/products', productRoutes); //use the productRoutes for the '/api/products' route

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes); 

app.use('/api/upload', uploadRoutes); //use the uploadRoutes for the '/api/upload' route

app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID})); //send the PAYPAL_CLIENT_ID from the environment variable to the client

const __dirname = path.resolve(); //get the current directory name
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //use the express.static middleware to serve the static files from the uploads folder


// the reason that we use notfound here is to handle the case that the route does not exist
// if not exsits, it will not go to above 2 routes, so there is no response or error handled,
// so we know the route does not exist, so we need to handle it manually and pass it to the notFound middleware function
// if the routes exists, it will response or error handled, which will return right away, and not 
// go to this line
app.use(notFound); 

// if there is an error thrown in the above 2 routes, it will be thrown and passed to errorhandler,
// which is the function has the error parameter, and it will handle the error and send the response to the client
app.use(errorHandler); 

//listen the port 5000, when the server is running, 
//it will print the message 'Server is running on http://localhost:5000'
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}
);


//the reason that declare the get functuon before the listen function is that
//we need to define the route before we start the server,
//otherwise the server will not know what to do when it receives a request after it starts and
//before the route is defined  