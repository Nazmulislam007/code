const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const People = require('../../models/People');

const addUserValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            try {
                const user = await People.findOne({ email: value });
                if (user) throw createError('Email already exist');
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true,
        })
        .withMessage('Mobile number must be a valid Bangladeshi mobile number')
        .custom(async (value) => {
            try {
                const user = await People.findOne({ mobile: value });
                if (user) {
                    throw createError('Mobile already is use!');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
        ),
];

const addUserValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if (Object.keys(mappedError).length > 0) {
        if (req.files?.length > 0) {
            fs.unlink(
                path.join(__dirname, `/../../public/uploads/avatars/${req.files[0].filename}`),
                (err) => {
                    console.log(err);
                }
            );
        }

        res.status(500).json({
            errors: mappedError,
        });
    } else {
        next();
    }
};

module.exports = { addUserValidator, addUserValidatorHandler };
