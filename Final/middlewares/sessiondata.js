module.exports = (req, res, next) => {
    res.locals.searchHistory = req.session.searchHistory || [];
    next();
};
