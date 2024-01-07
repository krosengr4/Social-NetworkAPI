// import express middlewear
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import and initialize our routes
const routes = require('./routes');
app.use(routes);

// import database connection to MongoDB
const mongoDB = require('./config/connection');

// create local host port
const PORT = process.env.PORT || 3003;

// start server. .once() listens to open event once (= suc. mongoDB connection)
mongoDB.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running at: http://localhost:${PORT}/api/thoughts`);
    });
});

