
//
// tests/index.js
//

const { app, store, chai, samplePosts, deepCopy } = require('./common');

describe('Test REST API', function() {

  let server = null;

  before(function(done){
    // start server
    server = app.listen(3001, function(){ done(); });
  });

  beforeEach(function(){
    // init data
    store.posts = deepCopy(samplePosts);
  });

  after(function(){
    // shut down server
    server.close(function(){
      setTimeout(function () { // wait to get the test summary
        process.exit(0);
      }, 100);
    });
  });

  //
  // A simple preliminary test
  //

  it('should success on / GET', function(done) {
    chai.request(app).get('/').end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  //
  // Test posts
  //

  describe('Test posts', function(){
    require('./include/test_posts');
  });

  //
  // Test comments
  //

  describe('Test comments', function() {
    require('./include/test_comments');
  });

});
