const createError = require('http-errors');
const People = require('../models/People');
const Conversation = require('../models/Conversation');
// eslint-disable-next-line no-useless-escape
const escape = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const getInbox = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            $or: [{ 'creator.id': req.user.userId }, { 'participant.id': req.user.userId }],
        });

        res.locals.data = conversation;
        res.render('inbox');
    } catch (error) {
        next(error);
    }
};

const searchUser = async (req, res) => {
    const { user } = req.body;
    const searchQuery = user.replace('+088', '');

    const name_search_regex = new RegExp(escape(searchQuery), 'i');
    const mobile_search_regex = new RegExp(`^${escape(`+88${searchQuery}`)}`);
    const email_search_regex = new RegExp(`^${escape(searchQuery)}$`, 'i');

    try {
        if (searchQuery !== '') {
            const users = await People.find(
                {
                    $or: [
                        { name: name_search_regex },
                        { mobile: mobile_search_regex },
                        { email: email_search_regex },
                    ],
                },
                'name avatar'
            );

            res.json(users);
        } else {
            throw createError('You must provide some text to search!');
        }
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};

const addConversation = async (req, res) => {
    try {
        const newConversation = new Conversation({
            creator: {
                id: req.user.userId,
                name: req.user.name,
                avatar: req.user.avatar || null,
            },
            participant: {
                id: req.body.id,
                name: req.body.participant,
                avatar: req.body.avatar || null,
            },
        });

        await newConversation.save();

        res.status(201).json({
            message: 'Conversation created successfully',
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};

module.exports = { getInbox, searchUser, addConversation };
