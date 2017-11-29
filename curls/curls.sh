# POST POST

curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts"

# PUT POST

curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/0"

# GET POST

curl "http://localhost:3000/posts"

curl "http://localhost:3000/xyz"

# DELETE POST

curl -X DELETE "http://localhost:3000/posts/0"

# GET COMMENTS

curl "http://localhost:3000/posts/0/comments"

# POST COMMENT

curl -H "Content-Type: application/json" -X POST -d '{"text": "comment ..."}'  "http://localhost:3000/posts/0/comments"

# PUT COMMENT

curl -H "Content-Type: application/json" -X PUT -d '{"text": "comment ..."}'  "http://localhost:3000/posts/0/comments/1"
