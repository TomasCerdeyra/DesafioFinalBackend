import ModelCart from "../../components/models/cart.js";
import ModelProduct from "../../components/models/product.js";
import { logger } from "../../utils/pino.js";
import sendMails from "../../utils/sendMail.js";

const productsCart = async (req, res) => {
    const user = req.user.id
    try {
        const cart = await ModelCart.findOne({ user }).lean()

        const prods = cart ? cart.products : [];

        res.render('cart', { prodsCart: prods, total: cart.total })
    } catch (error) {
        logger.info(error)
    }
}

const deleteProd = async (req, res) => {
    const { id } = req.params
    const user = req.user.id
    try {

        const prod = await ModelProduct.findOne({ _id: id })
        await ModelCart.findOneAndUpdate(
            { user: user },
            {
                $pull: { products: { _id: id } },
                $inc: { total: -parseInt(prod.price) }
            }
        );
        res.redirect('/api/carrito')
    } catch (error) {
        logger.info(error)
        res.redirect('/api/carrito')
    }
}

const finishesBuying = async (req, res) => {
    const { email, name, id } = req.user
    try {
        const cart = await ModelCart.findOne({ id })
        const prods = cart.products.map((prod, i) => `${i + 1}. ${prod.name}`)
        const listaProds = prods.join(', ')

        sendMails(email, name, listaProds)
        res.render('finish')
    } catch (error) {
        logger.info(error)
    }
}

export {
    productsCart,
    deleteProd,
    finishesBuying
}