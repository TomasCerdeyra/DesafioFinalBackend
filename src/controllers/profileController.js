const profile = async (req, res) => {
    res.render('perfil', { user: req.user })
}

export {
    profile
}