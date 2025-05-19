import express from 'express';
const router = express.Router();

import { getProducts, getProductById } from '../controllers/productController.js';

//the reason thta we use asyncHandler is to handle the errors of all cases
// like if the database is not connected, then it will throw an error
// and we can handle that error in the asyncHandler middleware
router.route('/').get(getProducts); //get all the products from the database

router.route("/:id").get(getProductById); //get the

export default router;