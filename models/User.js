require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Books', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected')
});
///////////////////////////////
const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
})
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    books: [BookSchema]
});
//////////////////////
const User = mongoose.model('user', UserSchema);

//////////////////////////
const amr = new User({ email: 'amr.nzzal@gmail.com', books: [{ name: 'c#', description: 'hello from c#', status: '2012' }, { name: 'JS', description: 'hello from JS', status: '2021' }, { name: 'flutter', description: 'hello from flutter', status: '2025' }] });
// amr.save();
User.find({ email: 'amr.nzzal@gmail.com' }, (err, x) => {
    if (err) return console.error(err);
    console.log({ x })
});

function getByEmail(req, res) {
    const { email } = req.query;
    console.log(email);
    User.find({ email: email }, function (err, ownerData) {
        if (err) res.send('No ');
        console.log(ownerData[0].books)
        res.send(ownerData[0].books);
    });
}
module.exports = getByEmail;