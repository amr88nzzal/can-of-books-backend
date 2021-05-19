'use strict';
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8081;
app.use(cors());
const userPage = require('./models/User');
// const addNewBooks = require('./models/User');
// const deleteBook = require('./models/User');

app.use(express.json());

app.get('/', homePage);
function homePage(req, res) {
  res.send('welcome to the home page.')
}

app.get('/book', userPage.getByEmail);
app.post('/book',userPage.addNewBooks);
app.delete('/book/:index',userPage.deleteBook);
app.put('/book/:index',userPage.updateBook);

app.listen(port, () => { console.log("server port :" + port); });



