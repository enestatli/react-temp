const mongoose = require('mongoose');

/**
 * 
 * 
 *
 
     
      unique-url1: [
        {
          id: string,
          name: string;
          comment_text: string,
          date: Date,
        },
         {
          id: string,
          name: string;
          comment_text: string,
          date: Date,
        },
      ],
      unique-url2: [
        {
          id: string,
          name: string;
          comment_text: string,
          date: Date,
        },
         {
          id: string,
          name: string;
          comment_text: string,
          date: Date,
        },
      ]
     


 * 
 * 
 */

const CommentSchema = new mongoose.Schema({
  comments: { type: Object, default: {} },
});

var Comment = mongoose.model('comment', CommentSchema);

// Create a single instance
Comment.findOne((error, doc) => {
  if (error) {
    console.log(error);
    return;
  }
  if (doc === null) {
    const self = new Comment();
    self.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

module.exports = Comment;
