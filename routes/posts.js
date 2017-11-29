
//
// routes/post.js
//

const { matchedData } = require('express-validator/filter');
const { validationResult } = require('express-validator/check');

const store = require('../data/store');

module.exports = {

  //
  // List posts (without comments)
  //

  getPosts(req, res) {

    const postsWithoutComments = store.posts.map(post=>(delete post.comments, post));
    res.status(200).send(postsWithoutComments);
  },

  //
  // Add post
  //

  addPost(req, res) {

    if (!isRequestValid(req, res)) return;

    const newPost = matchedData(req, { locations: ['body'] });
    newPost.comments = [];
    store.posts.push(newPost);

    const newPostId = store.posts.length - 1;
    res.status(201).send({postId: newPostId});
  },

  //
  // Update post
  //

  updatePost(req, res) {

    if (!isRequestValid(req, res)) return;

    const index = req.params.postId
    const currentPost = store.posts[index];
    const updatedPost = matchedData(req, { locations: ['body'] });

    store.posts[index] = Object.assign(currentPost, updatedPost);

    res.status(200).send(updatedPost);
  },

  //
  // Remove post
  //

  removePost(req, res) {

    if (!isRequestValid(req, res)) return;

    const index = req.params.postId;

    store.posts.splice(index, 1);
    res.status(204).send();
  }
}

//
// Helpers
//

const isRequestValid = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(422).json({ errors: errors.mapped()});
  return errors.isEmpty();
}
