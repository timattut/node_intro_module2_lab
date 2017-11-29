
//
// test/include/test_posts.js
//

const {
  app, store, chai,
  samplePosts, samplePostsWithoutComments,
  deepCopy
} = require('../common');


// -----------------------------------------------------------------------
// List posts
//

describe('List posts (/posts GET)', function(){

  it('should list all posts without comments', function(done){

    chai.request(app).get('/posts').end(function(err, res){

      res.should.have.status(200);
      res.should.be.json;

      const actualPosts = res.body;
      const expectedPosts = samplePostsWithoutComments;

      actualPosts.should.be.deep.equal(expectedPosts);

      done();

    });//chai.request
  });//it

});//describe (List posts)


// -----------------------------------------------------------------------
// Add a post
//

describe('Add a post (/posts POST)', function(){

  it('should add a single post', function(done){

    const actualSentPost = {
      name: ' aaa ',
      url: ' bbb ',
      text: ' ccc  ',
      comments: {text: 'ddd'},
      extra: 'eee'
    };

    chai.request(app).post('/posts').send(actualSentPost).end(function(err, res){

      res.should.have.status(201);
      res.should.be.json;

      const expectedNewPost  = {
        name: 'aaa',
        url: 'bbb',
        text: 'ccc',
        comments: []
      };

      const actualStoredPosts = store.posts;

      const expectedStoredPosts = deepCopy(samplePosts);
      expectedStoredPosts.push(expectedNewPost);

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      const actualReply = res.body;
      const expectedReply = {postId: actualStoredPosts.length - 1};

      actualReply.should.be.deep.equal(expectedReply);

      done();

    }); // chai.request

  }); // it

  it('should not accept an empty name', function(done){

    const actualSentPost = {
      name: '  ',
      url: ' bbb ',
      text: ' ccc  '
    };

    chai.request(app).post('/posts').send(actualSentPost).end(function(err, res){

      res.should.have.status(422);

      const actualStoredPosts = store.posts;
      const expectedStoredPosts = samplePosts;

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();

    }); // chai.request

  }); // it


  it('should not accept missing url', function(done){

    const actualSentPost = {
      name: ' aaa  ',
      text: ' ccc  '
    };

    chai.request(app).post('/posts').send(actualSentPost).end(function(err, res){

      res.should.have.status(422);

      const actualStoredPosts = store.posts;
      const expectedStoredPosts = samplePosts;

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();

    }); // chai.request

  }); // it

}); // describe (Add a post)


// -----------------------------------------------------------------------
// Modify a post
//

describe('Modify a post (/posts/<id> PUT)', function(){

  it('should update a single post', function(done){

    const actualSentPost = {
      name: ' aaa ',
      url: ' bbb ',
      text: ' ccc  ',
      comments: {text: 'ddd'},
      extra: 'eee'
    };

    const postId = samplePosts.length - 1;

    chai.request(app).put('/posts/'+postId).send(actualSentPost).end(function(err, res){

      res.should.have.status(200);
      res.should.be.json;

      const expectedModifiedPost  = {
        name: 'aaa',
        url: 'bbb',
        text: 'ccc'
      };

      const actualStoredPosts = store.posts;

      const expectedStoredPosts = deepCopy(samplePosts);
      expectedStoredPosts[postId] = Object.assign(expectedStoredPosts[postId], expectedModifiedPost);

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      const actualReply = res.body;
      const expectedReply = expectedModifiedPost;

      actualReply.should.be.deep.equal(expectedReply);

      done();

    }); // chai.request

  }); // it


  it('should not accept missing name', function(done){

    const actualSentPost = {
      url: ' bbb ',
      text: ' ccc  '
    };

    const postId = samplePosts.length - 1;

    chai.request(app).put('/posts/'+postId).send(actualSentPost).end(function(err, res){

      res.should.have.status(422);

      const actualStoredPosts = store.posts;
      const expectedStoredPosts = samplePosts;

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();

    }); // chai.request

  }); // it


  it('should not accept an empty url', function(done){

    const actualSentPost = {
      name: ' aaa  ',
      url: '  ',
      text: ' ccc  '
    };

    const postId = samplePosts.length - 1;

    chai.request(app).put('/posts/'+postId).send(actualSentPost).end(function(err, res){

      res.should.have.status(422);

      const actualStoredPosts = store.posts;
      const expectedStoredPosts = samplePosts;

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();

    }); // chai.request

  }); // it


  it('should not accept an unknown id', function(done){

    const actualSentPost = {
      name: ' aaa  ',
      url: '  ',
      text: ' ccc  '
    };

    const postId = samplePosts.length;

    chai.request(app).put('/posts/'+postId).send(actualSentPost).end(function(err, res){

      res.should.have.status(422);

      const actualStoredPosts = store.posts;
      const expectedStoredPosts = samplePosts;

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();

    }); // chai.request

  }); // it

});// describe (Modify post)


// -----------------------------------------------------------------------
// Remove a post
//

describe('Remove a post (/posts/<id> DELETE)', function(){

  it('should delete a single post', function(done){

    const postId = 0;

    chai.request(app).delete('/posts/'+postId).send().end(function(err, res){

      res.should.have.status(204);

      const actualStoredPosts = store.posts;

      const expectedStoredPosts = deepCopy(samplePosts);
      expectedStoredPosts.splice(postId, 1);

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();

    }); // chai.request

  }); // it

  it('should not accept an unknown id', function(done){

    const postId = samplePosts.length;

    chai.request(app).delete('/posts/'+postId).send().end(function(err, res){

      res.should.have.status(422);

      const actualStoredPosts = store.posts;
      const expectedStoredPosts = samplePosts;

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();

    }); // chai.request

  }); // it

}); // describe (Remove a post)
