
//
// routes/index.js
//


const { body, param } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const { getPosts, addPost, updatePost, removePost } = require('./posts');
const {getComments, addComment, updateComment, removeComment} = require('./comments');

module.exports = app => {

  //
  // Root route
  //

  app.get('/', (req, res) => {
    res.status(200).send('Module 2 Assignment Lab: RESTful Blog API\n');
  });

  //
  // Post CRUD
  //

  app.get('/posts', getPosts);

  app.post('/posts', [
    body(['name','url']).exists().trim().not().isEmpty(),
    body('text').exists(),
    sanitizeBody(['name','url','text']).trim()
  ], addPost);

  app.put('/posts/:postId', [
    param('postId').isInt().custom(postExists),
    body(['name','url']).exists().trim().not().isEmpty(),
    body('text').exists(),
    sanitizeBody(['name','url','text']).trim()
  ], updatePost);

  app.delete('/posts/:postId', [
    param('postId').isInt().custom(postExists)
  ],removePost);

  //
  // Comment CRUD
  //

  app.get('/posts/:postId/comments', [
    param('postId').isInt().custom(postExists)
  ], getComments);

  app.post('/posts/:postId/comments', [
    param('postId').isInt().custom(postExists),
    body('text').exists().trim().not().isEmpty(),
    sanitizeBody('text').trim()
  ], addComment);

  app.put('/posts/:postId/comments/:commentId',[
    param('postId').isInt().custom(postExists),
    param('commentId').isInt().custom(commentExists),
    body('text').exists().trim().not().isEmpty(),
    sanitizeBody('text').trim()
  ],  updateComment);

  app.delete('/posts/:postId/comments/:commentId', [
    param('postId').isInt().custom(postExists),
    param('commentId').isInt().custom(commentExists)
  ], removeComment);

  //
  // Route not found
  //

  app.all('*', (req, res) => {
    res.status(404).send('Not found.\n');
  });

};

//
// Helpers
//

const store = require('../data/store');

const postExists =
(index) =>
(typeof store.posts[index] !== 'undefined');

const commentExists =
(index, {req}) =>
(typeof store.posts[req.params.postId].comments[index] !== 'undefined');
