const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), productController.create);
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/update/:id', upload.single('image'), productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
