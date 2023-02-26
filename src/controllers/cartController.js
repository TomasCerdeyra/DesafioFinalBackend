import ModelCart from "../models/cart.js";

const productsCart = async (req, res) => {
    const user = req.user.id
    try {
        const cart = await ModelCart.findOne({ user }).lean()

        const prods = cart ? cart.products : [];

        res.render('cart', { prodsCart: prods })
    } catch (error) {
        console.log(error);
    }
}

const deleteProd = async (req, res) => {
    const { id } = req.params
    const user = req.user.id
    try {
        await ModelCart.findOneAndUpdate(
            { user: user },
            { $pull: { products: { _id: id } } }
        );
        res.redirect('/api/carrito')
    } catch (error) {
        res.redirect('/api/carrito')
    }
}

export {
    productsCart,
    deleteProd
}