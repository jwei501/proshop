import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models/productModel.js'; //import the Product model from the productModel.js file

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 2
    const page = Number(req.query.pageNumber) || 1; //get the page size from the query string or set it to 2 by default

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const count = await Product.countDocuments({...keyword}); //count the number of products in the database
    // Product.find({}) is an async function so we need to use await
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1)); //find all the products in the DATABASE

    res.json({ products, page, pages: Math.ceil(count / pageSize) }); //send the products data to the client in json format, after adding the find method
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

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    //console.log('Updating product', req.params.id);

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({_id: product._id}); //delete the product from the database
        res.status(200).json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
    
});

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products);
});




export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts };