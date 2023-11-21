// controllers/imageController.js
const Image = require('../models/Image');

const imageController = {
  getAllImages: async (req, res) => {
    try {
      const { page = 1, limit = 10, sort, search } = req.query;

      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }
  
      const images = await Image.find(query)
        .sort(sort)
        .limit(parseInt(limit))
        .skip((page - 1) * limit);
      res.json(images);
    } catch (err) {
   //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
  getImagesById: async (req, res) => {

    try {
      console.log(req.params.id);
      const images = await Image.findById(req.params.id);
      res.json(images);
    } catch (err) {
   //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
  createImage: async (req, res) => {
    const { name, description, imageUrl } = req.body;

    try {
      const newImage = new Image({ name, description, imageUrl });
      await newImage.save();
      res.json(newImage);
      req.flash('success_msg', 'Image uploaded successfully');
    } catch (err) {
      req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  updateImage: async (req, res) => {
    const { name, description } = req.body;

    try {
      const updatedImage = await Image.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
      res.json(updatedImage);
  //    req.flash('success_msg', 'Image updated successfully');
    } catch (err) {
   //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  deleteImage: async (req, res) => {
    try {
      await Image.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Image removed' });
   //   req.flash('success_msg', 'Image removed successfully');
    } catch (err) {
   //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = imageController;
