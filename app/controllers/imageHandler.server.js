'use strict';

const Image = require('../models/image');

function ImageHandler() {
  this.myImages = function(req, res) {
    let error = req.query.error;
    Image
      .find({'author': req.user.twitter.id})
      .exec((err, images) => {
        res.render('my-images', {
          images: JSON.stringify(images),
          error: error
        });
      });

  }

  this.newImage = function(req, res) {
    const imageURL = req.body.imageUrl;
    const description = req.body.imageDescription;

    if (!imageURL) {
      const error = 'Image URL cannot be empty';
      return res.redirect('/my-images?error=' + error);
    }

    const image = new Image({
      link: imageURL,
      description: description,
      author: req.user.twitter.id
    });

    if (image.errors) {
      const error = 'Something went wrong :(';
      return res.redirect('/my-images?error=' + error);
    }

    return image
      .save()
      .then(() => {
        res.redirect('my-images');
      })
  }
}

module.exports = ImageHandler;
