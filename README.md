# KVS - Monks

## App Running on Heroku

[Key Value Heroku](http://kvs-monks.herokuapp.com/)

## Clone Project from Github

`git clone https://github.com/amilcarcattaneo/kvs-monks.git`

`cd kvs-monks`

## Install Dependencies

    1. `npm install`
    2. `cd server && npm install`
    3. `cd  .. && cd client && npm install`

## Start Server and Client

`npm start` : will start both

## API REST

If you have Postman installed, inside the project you'll find a Postman collection with the requests.

    * GET 'http://localhost:8000/keyvalue/key/test'
    	header 'Content-Type: application/json'
    * Status Code:
    	1. **200**: if the key has a value.
    	2. **400**: if the key param is undefined or contains only white spaces.
    	3. **404**: if the key doesn’t have a value.

```
curl --location --request GET 'http://localhost:8000/keyvalue/key/test' \
--header 'Content-Type: application/json'
```

    * POST 'http://localhost:8000/keyvalue/key'
    	header 'Content-Type: application/json'
    * Status Code:
    	1. **201**: if the key value pair was accepted.
    	2. **400**: if the key or the value are undefined or contains only white spaces.

```
curl --location --request POST 'http://localhost:8000/keyvalue/key' \
--header 'Content-Type: application/json' \
--data-raw '{
	"key": "test",
	"value": "test"
}'
```

## Main Dependencies

    * NodeJS: [Node.js · GitHub](https://github.com/nodejs)
    * Socket.IO for websockets: [GitHub - socketio/socket.io: Realtime application framework (Node.JS server)](https://github.com/socketio/socket.io)
    * Express for routing and start a server: [GitHub - expressjs/express: Fast, unopinionated, minimalist web framework for node.](https://github.com/expressjs/express)
    * Mongoose to handle MongoDB: [GitHub - Automattic/mongoose: MongoDB object modeling designed to work in an asynchronous environment.](https://github.com/Automattic/mongoose)
    * Mocha for tests: [GitHub - mochajs/mocha: ☕️ simple, flexible, fun javascript test framework for node.js & the browser](https://github.com/mochajs/mocha)
