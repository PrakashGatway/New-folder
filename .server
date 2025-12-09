const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: .env.${process.env.NODE_ENV} });
process.on('uncaughtException', err => {
    // console.log(err.name, err.message);
    console.log('UNHANDLED EXCEPTION ! SHUTTING DOWN.....');
    process.exit(1);
});
const app = require('./app');
mongoose.connect(process.env.DATABASE_LOCAL_STRING)
    .then(con => {
        console.log('db connected');
    }).catch(error => {
        console.log('mongooseError', error);
    })


app.listen(process.env.PORT, () => {
    console.log(app is running on Port, process.env.PORT)
});

process.on('unhandledRejection', err => {
    // console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION ! SHUTTING DOWN.....');
    server.close(() => {
