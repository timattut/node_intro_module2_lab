
//
// routes/comments.js
//

const store = require('../data/store');

module.exports = {

  //
  // List comments
  //

  getComments(req, res) {

    if (!isRequestValid(req, res)) return;

    const index = req.params.postId;
    const postComments = store.posts[index].comments;
    res.status(200).send(postComments);
  },

  //
  // Add comment
  //

  addComment(req, res) {

    if (!isRequestValid(req, res)) return;

    const newComment = {
      text: req.body.text
    };
    const index = req.params.postId;

    store.posts[index].comments.push(newComment);
    const commentsLength = store.posts[index].comments.length;

    res.status(201).send({commentId: commentsLength - 1});
  },

  //
  // Update comment
  //

  updateComment(req, res) {

    if (!isRequestValid(req, res)) return;

    const updatedComment = {
      text: req.body.text
    };
    const postIndex = req.params.postId;
    const commentIndex = req.params.commentId;

    store.posts[postIndex].comments[commentIndex] = updatedComment;
    res.status(200).send(updatedComment);
    },

    //
    // Remove comment
    //

    removeComment(req, res) {

      if (!isRequestValid(req, res)) return;

      const postIndex = req.params.postId;
      const commentIndex = req.params.commentId;

      store.posts[postIndex].comments.splice(commentIndex, 1);
      res.status(204).send();
    }

  }

  //
  // Helpers
  //

  const { validationResult } = require('express-validator/check');

  const isRequestValid = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(422).json({ errors: errors.mapped()});
    return errors.isEmpty();
  }
