const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed!"));
  },
});

// Controller functions

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json({ success: true, data: products });
});

// Get single product by ID
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
  });
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, data: product });
});

// Add a new product
exports.createProduct = [
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const { name, price, description, category } = req.body;

    // Validation for required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (name, price, description, category) are required.",
      });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        category,
        imageUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: "product added successfuly",
      data: product,
    });
  }),
];

// Update product by ID
exports.updateProduct = [
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const { name, price, description, category } = req.body;
    const productId = req.params.id;

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let imageUrl = existingProduct.imageUrl;
    if (req.file) {
      // Delete old image if exists
      if (imageUrl) {
        fs.unlink(path.join(__dirname, `../../${imageUrl}`), (err) => {
          if (err) console.log(err);
        });
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedData = {};
    if (name) updatedData.name = name;
    if (price) updatedData.price = parseFloat(price);
    if (description) updatedData.description = description;
    if (category) updatedData.category = category;
    updatedData.imageUrl = imageUrl;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updatedData,
    });

    res.status(200).json({
      success: true,
      message: "product updated successfuly",
      data: updatedProduct,
    });
  }),
];

// Delete product by ID
exports.deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!existingProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  if (existingProduct.imageUrl) {
    fs.unlink(
      path.join(__dirname, `../../${existingProduct.imageUrl}`),
      (err) => {
        if (err) console.log(err);
      }
    );
  }

  await prisma.product.delete({ where: { id: productId } });

  res
    .status(204)
    .json({ success: true, message: "Product deleted successfully" });
});
