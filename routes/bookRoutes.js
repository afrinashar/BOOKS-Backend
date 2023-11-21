// routes/BooksRoutes.js
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const upload = require("../middleware/upload");

router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBooksById);
router.post("/books", upload, bookController.createBooks);
router.put("/books/:id", bookController.updateBooks);
router.delete("/books/:id", bookController.deleteBooks);

module.exports = router;
