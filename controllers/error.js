exports.get404 = (req, res, next) => {
    // 404 page
    res.render('pages/404', 
    {
        title: '404 - Page Not Found',
        path: req.url,
        isAuthenticated: req.session.isLoggedIn,
    });

}

exports.get500 = (req, res, next) => {
    // 404 page
    res.status(500).render('pages/500', 
    {
        title: '500 - Serverside error',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn,
    });

}