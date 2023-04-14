import ContainerProducts from "../../components/DAO/Products/Products.js";

const controller = new ContainerProducts()

const home = async (req, res) => {
    const products = await controller.getAll()
    res.render('home', { products: products, name: req.user.name })
}

const addCart = async (req, res) => {
    const { id } = req.params
    const idUser = req.user.id
    try {
        await controller.pushProductCart(id, idUser)
        res.redirect('/api/carrito')

    } catch (error) {
        res.redirect('/api/home')
    }
}

export {
    home,
    addCart
}