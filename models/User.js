// require packages

require('dotenv').config();
const { response } = require('express');
const mongoose = require('mongoose');
const cors = require("cors");




// mongoose initialization
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected')
});





// we will create A schema for the book that will go in the schema of the user so that each user input will have a book schema to work and edit.

const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
})



const UserSchema = new mongoose.Schema({
    email: { type: String, require: true },
    books: [BookSchema]
});



const User = mongoose.model('user', UserSchema);




// populating our data

const amr = new User(
    {
        email: 'amr.nzzal@gmail.com',
        books: [{
            name: 'c#',
            description: 'hello from c#',
            status: '2012'
        }
            ,
        {
            name: 'JS',
            description: 'hello from JS',
            status: '2021'
        }
            ,
        {
            name: 'flutter',
            description: 'hello from flutter',
            status: '2025'
        }
        ]
    }
);






const mohammad = new User(
    {
        email: 'm98altamimi@gmail.com',
        books: [{
            name: 'The Forty Rules of Love',
            description: 'Good Read',
            status: 'In Print'
        }
            ,
        {
            name: 'A Tale of Two Cities',
            description: 'A great novel! ',
            status: 'Available'
        }
            ,
        {
            name: 'Oliver Twist',
            description: 'Awesome story',
            status: 'On order'
        }
        ]
    }
);

// amr.save();
// mohammad.save();


User.find({ email: 'amr.nzzal@gmail.com' }, (err, details) => {
    if (err) return console.error(err);
    // console.log({ details })
});

User.find({ email: 'm98altamimi@gmail.com' }, (err, details) => {
    if (err) return console.error(err);
    // console.log({ details })
});



getByEmail = async (req, res) => {
    const { email } = req.query;
    console.log(email);
    User.find({ email: email }, function (err, ownerData) {
        console.log(ownerData)
        if (err) res.send('No ');
        // console.log(ownerData[0].books)
        res.send(ownerData[0].books);
    });
}






// add new books 
// TODO: push in the array of your current books your new books.
addNewBooks = async (req, res) => {
    const { email, name, description, status } = req.body;
    console.log('req.body=', req.body);

    try {
        await User.find({ email: email }, (err, ownerData) => {    // 
            if (ownerData.length) {
                ownerData[0].books.push({
                    name: name,
                    description: description,
                    status: status
                }
                )
                ownerData[0].save();
                res.send(ownerData[0].books);
            } else {
                return console.error(error);
            }
        })
    }
    catch (error) {
        console.log(error);
        res.send('didn\'t post')
    }
};
// delete an existing book 

deleteBook = async (req, res) => {
    const index = Number(req.params.index);
    const email = req.query.email;

    await User.find({ email: email }, (err, ownerData) => {
        try {
            const newArray = ownerData[0].books.filter((book, idx) => {
                return idx !== index
            });
            ownerData[0].books = newArray;
            ownerData[0].save();

            res.send(ownerData[0].books);
        }
        catch (error) {
            response.send("no user found");
            console.log(error)
        }
    }
    );
};
updateBook = async (req, res) => {
    const index = Number(req.params.index);
    const { email, name, description, status } = req.body;
    // console.log('req.body=', req.body,index,req.params.index);

    await User.find({ email: email }, (err, ownerData) => {
        try {
            ownerData[0].books.splice(index, 1, { name: name, description: description, status: status });
            ownerData[0].save();

            res.send(ownerData[0].books);
        }
        catch (error) {
            response.send(error);
            console.log(error)
        }
    }
    );



};
module.exports = { getByEmail, deleteBook, addNewBooks, updateBook }


