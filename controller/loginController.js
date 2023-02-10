/* eslint-disable no-underscore-dangle */
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const People = require('../models/People');

const getLogin = (req, res) => {
    res.render('index');
};

const login = async (req, res) => {
    try {
        const user = await People.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });

        if (user?._id) {
            const isValidPassword = await compare(req.body.password, user.password);

            if (isValidPassword) {
                // prepare the user object to generate token;
                const userObject = {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: 'user',
                };

                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: 60000,
                });

                // set cookies
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: 60000,
                    signed: true,
                    httpOnly: true,
                });

                // set logged in user local identifier
                res.locals.loggedInUser = userObject;
                res.status(200).render('inbox');
            } else {
                throw createError('Login failed. Please try again!');
            }
        } else {
            throw createError('Login failed. Please try again!');
        }
    } catch (error) {
        res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};

module.exports = { getLogin, login };
