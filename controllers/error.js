exports.getError = (req, res, next) => {
    // 404 page
    res.render('pages/404', 
    {
        title: '404 - Page Not Found',
        path: req.url,
        isAuthenticated: req.session.isLoggedIn,
    });

}