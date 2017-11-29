
//
// test/common.js
//

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const deepCopy = (obj) => (JSON.parse(JSON.stringify(obj)));

const samplePosts = require('./init_data/sample_posts.json');
const samplePostsWithoutComments = deepCopy(samplePosts);
samplePostsWithoutComments.forEach(post=>{delete post.comments});

const app = require('../app');
const store = require('../data/store');

module.exports = {
  app, store,
  chai, should,
  samplePosts,
  samplePostsWithoutComments,
  deepCopy
}
