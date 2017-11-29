# node_intro_module2_lab  
edX Introduction to NodeJS   
Module 2 Assignment Lab: RESTful Blog API


> 1.
> Walk us through the design of your project.
> (Why did you design your project the way you did?
> What difficulties did you overcome?)

The file structure of the project:

~~~
app.js          // express application
server.js       // main; starts application
[data]
  store.js      // array to store posts
[routes]
  index.js      // routes, checks and filters
  posts.js      // actions related to posts
  comments.js   // actions related to comments
[test]
  index.js            // main test script
  common.js           // tests commons
  [include]
    test_posts.js     // post related tests
    test_comments.js  // comment related tests
  [init_data]
    sample_posts.js   // data for tests  
~~~

The design of the project follows the assignment description concerning the routes and related actions. The definition on the application object and the application startup have been divided in different files. The checks and filters are based on [express-validator](https://www.npmjs.com/package/express-validator).


To run the application, use

~~~
node server
~~~

or

~~~
npm start
~~~

The latter starts the application with [`node-dev`](https://www.npmjs.com/package/node-dev).

> 2.
> How did you test your project to verify that it works?
> (If you used any specific curl requests, let us know.)

The `test` folder includes [mocha](https://www.npmjs.com/package/mocha) test scripts, which use [chai](https://www.npmjs.com/package/chai) and [chai-http](https://www.npmjs.com/package/chai-http).

To run the tests, use

~~~
mocha
~~~

or

~~~
npm test
~~~

When testing the application runs on port `3001`.

> 3.
> (Let us know if anything doesn't work as intended so
> your reviewers will know ahead of time.)
