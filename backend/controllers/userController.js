import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/userModel.js'; //import the Product model from the productModel.js file
import generateToken from '../utils/generateToken.js'; //import the generateToken function from the utils folder

// @desc   Auth user & get token
// @route  Post /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
       const { email, password } = req.body;
       const user = await User.findOne({ email });

       if ( user && (await user.matchPassword(password))) {
            generateToken(res, user._id);

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
       }  else {
            res.status(401);
            throw new Error('Invalid email or password');
       }
});

// @desc   Register a new user
// @route  Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        const userExists = await User.findOne ({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        } 

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, user._id);

            
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }

});

// @desc   Logout user/ clear cookie
// @route  Post /api/users
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Set the expiration date to the past
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

// @desc   Get user profile
// @route  Get /api/users
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc   Update user profile
// @route  put /api/users
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc   Get all users profile
// @route  Get /api/users
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc   Get all users profile
// @route  Get /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc   Delete user
// @route  Get /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc   Update user 
// @route  Put /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser };