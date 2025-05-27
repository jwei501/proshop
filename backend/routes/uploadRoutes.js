import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/; //allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //check the file extension
    const mimetype = filetypes.test(file.mimetype); //check the file type

    if (mimetype && extname) {
        return cb(null, true); //if the file type is allowed, return true
    } else {
        cb('Error: Images Only!'); //if the file type is not allowed, return false
    }
}

const upload = multer({
    storage,
}); //single image upload

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
    });
})

export default router;