// controllers/BooksController.js
const Books = require("../models/Books");

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const { page = 1, limit = 10, sort, search } = req.query;

      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      const books = await Books.find(query)
        .sort(sort)
        .limit(parseInt(limit))
        .skip((page - 1) * limit);
      res.json(books);
    } catch (err) {
      //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  getBooksById: async (req, res) => {
    try {
      console.log(req.params.id);
      const books = await Books.findById(req.params.id);
      res.json(books);
    } catch (err) {
      //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  createBooks: async (req, res) => {
    const { ImageUrl,title, author,publishedYear,genre,plot,synopsis,language,price } = req.body;

    try {
      const newBooks = new Books({ImageUrl,title, author,publishedYear,genre,plot,synopsis,language,price });
      await newBooks.save();
      res.json(newBooks);
      //req.flash("success_msg", "Books uploaded successfully");
    } catch (err) {
     // req.flash("error_msg", "Server Error");
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  updateBooks: async (req, res) => {
    const { ImageUrl, title, author,publishedYear,genre,plot,synopsis,language,price } = req.body;

    try {
      const updatedBooks = await Books.findByIdAndUpdate(
        req.params.id,
        { ImageUrl, title, author,publishedYear,genre,plot,synopsis,language,price },
        { new: true }
      );
      res.json(updatedBooks);
      //    req.flash('success_msg', 'Books updated successfully');
    } catch (err) {
      //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  deleteBooks: async (req, res) => {
    try {
      await Books.findByIdAndRemove(req.params.id);
      res.json({ msg: "Books removed" });
      //   req.flash('success_msg', 'Books removed successfully');
    } catch (err) {
      //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = bookController;
