import ModelProduct from "../../components/models/product.js";
import ModelCart from "../../components/models/cart.js";
import { logger } from "../../utils/pino.js";

const home = async (req, res) => {
    try {
        const products = await ModelProduct.find().lean()
        res.render('home', { products: products, name: req.user.name })
    } catch (error) {
        logger.info('No se encontraron productos en este momento');
    }
}

const addCart = async (req, res) => {
    const { id } = req.params
    const idUser = req.user.id
    try {
        const prod = await ModelProduct.findOne({ _id: id });

        if (!prod) throw new Error('El producto no existe');

        let cart = await ModelCart.findOne({ user: idUser });
        if (!cart) {
            // Si no existe, crea un nuevo carrito para el usuario
            cart = await ModelCart.create({ user: idUser });
        }

        cart = await ModelCart.findOneAndUpdate(
            { user: idUser },
            {
                $push: { products: prod },
                $inc: { total: parseInt(prod.price) }
            },
            { new: true }
        );

        res.redirect('/api/carrito')

    } catch (error) {
        logger.info({ msg: error.message });
        res.redirect('/api/home')
    }
}

export {
    home,
    addCart
}