const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { verifyToken, isAdmin } = require("../middleware/auth");

// PUBLIC ROUTES
router.get("/", getProducts);           // All products
router.get("/:id", getProductById);     // Single product

// PROTECTED ROUTES (Admin only)
router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
