const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const People = require('../models/People');

const getUsers = async (req, res, next) => {
    try {
        const users = await People.find();
        res.render('users', {
            users,
        });
    } catch (error) {
        next(error);
    }
};

const addUsers = async (req, res) => {
    let newUser;
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files?.length > 0) {
        newUser = new People({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashPassword,
        });
    } else {
        newUser = new People({
            ...req.body,
            password: hashPassword,
        });
    }

    try {
        await newUser.save();
        res.status(200).json({
            message: 'User was added successfully',
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Unkown error occured',
                },
            },
        });
    }
};
const removeUser = async (req, res) => {
    try {
        const user = await People.findByIdAndDelete({ _id: req.params.id });

        if (user.avatar) {
            fs.unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
                console.log(err);
            });
        }

        res.status(200).json({
            message: 'User delete successfully',
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Could not delete the user!',
                },
            },
        });
    }
};

module.exports = { getUsers, addUsers, removeUser };
