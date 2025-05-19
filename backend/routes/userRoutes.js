import express from 'express';
const router = express.Router();

import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; //import the protect and admin middleware functions


router.route('/').post(registerUser).get(protect, admin, getUsers); //register a new user and get all users
router.post('/auth', authUser); //login user
router.post('/logout', logoutUser); //logout user
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile); //get user profile and update user profile
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUser); //get user by id, delete user and update user

export default router;