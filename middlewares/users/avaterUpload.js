const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const avaterUpload = (req, res, next) => {
    const UPLOAD_FOLDER = `${__dirname}/../../public/uploads/avatars`;
    const file_type = ['image/jpeg', 'image/jpg', 'image/png'];
    const file_allow_err = 'Only .jpg, jpeg or .png format allowed!';

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = `${file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-')}-${Date.now()}`;
            cb(null, fileName + fileExt);
        },
    });

    const upload = multer({
        storage,
        limits: {
            fileSize: 1000000,
        },
        fileFilter: (req, file, cb) => {
            if (file_type.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(file_allow_err));
            }
        },
    });

    upload.any()(req, res, (err) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    avater: {
                        msg: err.message,
                    },
                },
            });
        }
        next();
    });
};

module.exports = avaterUpload;
