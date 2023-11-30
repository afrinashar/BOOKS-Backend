// models/Image.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  synopsis:String,
  plot:String,
  genre:String,
  language:String,
  price:String

});

const Books = mongoose.model('Book', bookSchema);

module.exports = Books;
