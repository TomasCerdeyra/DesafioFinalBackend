const authenticUsers = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/api/login')
}

export default authenticUsers