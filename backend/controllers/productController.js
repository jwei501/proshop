import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models/productModel.js'; //import the Product model from the productModel.js file

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
        // Product.find({}) is an async function so we need to use await
        const products = await Product.find({}); //find all the products in the DATABASE
        
        res.json(products); //send the products data to the client in json format, after adding the find method
        //res.json(products); //send the products data from the database instead of the products.js file at local
});

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id); //find the product by id from the database
        if (product) {
            return res.json(product); //send the product data to the client in json format
        } else{
            res.status(404); //if the id format is valid and product is not found, send a 404 status code

            // the reason we throw an error manually is that if the product is not found
            // it will not actually throw an error, it will just return null, and return 200 status code
            // so we need to throw an error manually to handle that case
            throw new Error('Product not found'); //throw an error message
        }
});

export { getProducts, getProductById };