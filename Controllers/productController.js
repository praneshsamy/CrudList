const Product = require('../Models/ProductModel'); 


exports.create = async (req, res) => {
    try {
        const { name, price, stock, description, category, manufacturingDate } = req.body;
        const image = req.file ? req.file.filename : null; 

        if (!name || !price || !stock || !description || !category || !manufacturingDate) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newProduct = new Product({
            name,
            price,
            stock,
            description,
            category,
            manufacturingDate: new Date(manufacturingDate),
            image
        });

        await newProduct.save();
        return res.status(201).json({ message: "Product Created Successfully", data: newProduct });
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong", message: err.message });
    }
};




exports.updateProduct = async (req, res) => {
    try {
        const { name, price, stock, description, category, manufacturingDate } = req.body;
        const image = req.file ? req.file.filename : req.body.image;  

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, stock, description, category, manufacturingDate, image },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

        res.status(200).json({ message: "Product Updated Successfully", data: updatedProduct });
    } catch (err) {
        res.status(500).json({ error: "Error updating product", message: err.message });
    }
};



exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Error fetching products", message: err.message });
    }
};




exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: "Error fetching product", message: err.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting product", message: err.message });
    }
};
