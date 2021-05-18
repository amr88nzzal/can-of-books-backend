'use strict';
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8081;
app.use(cors());
const getByEmail = require('./models/User');




app.get('/', homePage);
function homePage(req, res) {
  res.send('welcome to the home page.')
}

app.get('/book', getByEmail);
app.post('/book',addNewBooks);
app.delete('/book/:index',deleteBook);

app.listen(port, () => { console.log("server port :" + port); });



