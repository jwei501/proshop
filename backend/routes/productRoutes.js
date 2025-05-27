import express from 'express';
const router = express.Router();

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; //import the protect and admin middleware functions

//the reason thta we use asyncHandler is to handle the errors of all cases
// like if the database is not connected, then it will throw an error
// and we can handle that error in the asyncHandler middleware
router.route('/').get(getProducts).post(protect, admin, createProduct); //get all the products from the database

router.route('/top').get(getTopProducts); //get top rated products

router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct); //get the

router.route('/:id/reviews').post(protect, createProductReview); //create a review for a product



export default router;