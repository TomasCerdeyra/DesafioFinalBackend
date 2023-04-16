import ModelCart from "../../components/models/cart.js";
import ModelProduct from "../../components/models/product.js";
import ContainerCart from "../../components/DAO/Cart/Cart.js";
import { logger } from "../../utils/pino.js";
import sendMails from "../../utils/sendMail.js";

const controller = new ContainerCart();

const productsCart = async (req, res) => {
    const user = req.user.id
    try {
        const cart = await controller.getCartUser(user)
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
        await controller.delete(id, user)

        res.redirect('/api/carrito')
    } catch (error) {
        res.redirect('/api/carrito')
    }
}

const finishesBuying = async (req, res) => {
    const { email, name, id } = req.user 
    try {
        const cart = await controller.getCartId(id)
        
        const prods = cart.products.map((prod, i) => `${i + 1}. ${prod.name}`)
        const listaProds = prods.join(', ') 

        sendMails(email, name, listaProds) 
        res.render('finish')
    } catch (error) {
        console.log(error);
    }
}

export {
    productsCart,
    deleteProd,
    finishesBuying
}