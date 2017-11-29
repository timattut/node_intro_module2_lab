

curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"
curl -H "Content-Type: application/json" -X POST -d '{"text": "comment ..."}'  "http://localhost:3000/posts/0/comments"
