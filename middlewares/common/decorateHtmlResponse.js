const decorateHtmlResponse = (title_name) => (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${title_name} - chat application`;
    next();
};

module.exports = decorateHtmlResponse;
