
//
// test/include/test_comments.js
//

const {
  app, store, chai,
  samplePosts,
  deepCopy
} = require('../common');


// -----------------------------------------------------------------------
// List comments
//

describe('List comments (/posts/<postId>/comments GET)', function(){

  it('should list all comments', function(done){

    const postId = 0;

    chai.request(app).get(`/posts/${postId}/comments`).end(function(err, res){

      res.should.have.status(200);

      const actualComments = res.body;
      const expectedComments = samplePosts[postId].comments;

      actualComments.should.be.deep.equal(expectedComments);

      done();

    });//chai.request
  });//it

  it('should not accept an unknown id', function(done){

    const postId = samplePosts.length;

    chai.request(app).get(`/posts/${postId}/comments`).end(function(err, res){

      res.should.have.status(422);

      done();

    }); // chai.request

  }); // it

});


// -----------------------------------------------------------------------
// Add a comment
//

describe('Add a comment (/posts/<postId>/comments POST)', function(){

  it('should add a single comment', function(done){

    const sentComment = {
      text: ' abc  '
    };

    const postId = 0;

    chai.request(app).post(`/posts/${postId}/comments`).send(sentComment).end(function(err, res){

      res.should.have.status(201);
      res.should.be.json;

      const expectedNewComment  = {
        text: 'abc'
      };

      const actualStoredPosts = store.posts;

      const expectedStoredPosts = deepCopy(samplePosts);
      expectedStoredPosts[postId].comments.push(expectedNewComment);

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      const actualReply = res.body;
      const expectedReply = {commentId: expectedStoredPosts[postId].comments.length - 1};

      actualReply.should.be.deep.equal(expectedReply);

      done();

    }); // chai.request

  }); // it

  it('should not accept an empty text', function(done){

    const sentComment = {
      text: '   '
    };

    const postId = 0;

    chai.request(app).post(`/posts/${postId}/comments`).send(sentComment).end(function(err, res){

      res.should.have.status(422);
      store.posts.should.be.deep.equal(samplePosts);

      done();

    }); // chai.request

  }); // it


  it('should not accept missing text', function(done){

    const sentComment = {
    };

    const postId = 0;

    chai.request(app).post(`/posts/${postId}/comments`).send(sentComment).end(function(err, res){

      res.should.have.status(422);
      store.posts.should.be.deep.equal(samplePosts);

      done();

    });
  });

  it('should not accept an unknown id', function(done){

    const sentComment = {
      text: ' abc  '
    };

    const postId = samplePosts.length;

    chai.request(app).post(`/posts/${postId}/comments`).send(sentComment).end(function(err, res){

      res.should.have.status(422);

      done();

    }); // chai.request

  }); // it

}); // describe


// -----------------------------------------------------------------------
// Modify a comment
//

describe('Modify a comment (/posts/<postId>/comments/<commentId> PUT)', function(){

  it('should update a single comment', function(done){

    const sentComment = {
      text: ' abc  '
    };

    const postId = 0;
    const commentId = 0;

    chai.request(app).put(`/posts/${postId}/comments/${commentId}`).send(sentComment).end(function(err, res){

      res.should.have.status(200);
      res.should.be.json;

      const expectedModifiedComment  = {
        text: 'abc'
      };

      const actualStoredPosts = store.posts;

      const expectedStoredPosts = deepCopy(samplePosts);
      expectedStoredPosts[postId].comments[commentId] = expectedModifiedComment;

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      const actualReply = res.body;
      const expectedReply = expectedModifiedComment;

      actualReply.should.be.deep.equal(expectedReply);

      done();

    });

  }); // it


  it('should not accept an empty text', function(done){

    const sentComment = {
      text: '   '
    };

    const postId = 0;
    const commentId = 0;

    chai.request(app).put(`/posts/${postId}/comments/${commentId}`).send(sentComment).end(function(err, res){

      res.should.have.status(422);
      store.posts.should.be.deep.equal(samplePosts);

      done();

    }); // chai.request

  }); // it


  it('should not accept an unknown postId', function(done){

    const sentComment = {
      text: ' comment  '
    };

    const postId = store.posts.length;
    const commentId = 0;

    chai.request(app).put(`/posts/${postId}/comments/${commentId}`).send(sentComment).end(function(err, res){

      res.should.have.status(422);
      store.posts.should.be.deep.equal(samplePosts);

      done();

    }); // chai.request

  }); // it


  it('should not accept an unknown commentId', function(done){

    const sentComment = {
      text: ' comment  '
    };

    const postId = 0;
    const commentId = store.posts[postId].comments.length;

    chai.request(app).put(`/posts/${postId}/comments/${commentId}`).send(sentComment).end(function(err, res){

      res.should.have.status(422);
      store.posts.should.be.deep.equal(samplePosts);

      done();

    }); // chai.request

  }); // it

});


// -----------------------------------------------------------------------
// Remove a comment
//

describe('Remove a comment (/posts/<postId>/comments/<commentId> DELETE) ', function(){

  it('should remove a single comment', function(done){

    const postId = 0;
    const commentId = 0;

    chai.request(app).delete(`/posts/${postId}/comments/${commentId}`).send().end(function(err, res){

      res.should.have.status(204);

      const actualStoredPosts = store.posts;

      const expectedStoredPosts = deepCopy(samplePosts);
      expectedStoredPosts[postId].comments.splice(commentId,1);

      actualStoredPosts.should.be.deep.equal(expectedStoredPosts);

      done();
    });

  }); // it


  it('should not accept an unknown postId', function(done){

    const postId = store.posts.length;
    const commentId = 0;

    chai.request(app).delete(`/posts/${postId}/comments/${commentId}`).send().end(function(err, res){

      res.should.have.status(422);
      store.posts.should.be.deep.equal(samplePosts);

      done();

    }); // chai.request

  }); // it


  it('should not accept an unknown commentId', function(done){

    const postId = 0;
    const commentId = store.posts[postId].comments.length;

    chai.request(app).delete(`/posts/${postId}/comments/${commentId}`).send().end(function(err, res){

      res.should.have.status(422);
      store.posts.should.be.deep.equal(samplePosts);

      done();

    }); // chai.request

  }); // it

});
