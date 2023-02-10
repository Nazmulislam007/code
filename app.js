// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');

// internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const inboxRouter = require('./router/inboxRouter');
const usersRouter = require('./router/usersRouter');

const app = express();
dotenv.config();

app.locals.moment = moment;

mongoose.set('strictQuery', true);
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}
main()
    .then(() => console.log('database conneted'))
    .catch((err) => console.log(err));

// requeest parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret-key'));

// view engine setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// router setup
app.use('/', loginRouter);
app.use('/inbox', inboxRouter);
app.use('/users', usersRouter);

// 404 not found handler
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(3330, () => {
    console.log(`server listening on port http://localhost:${3330}`);
});
