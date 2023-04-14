import ModelProduct from '../../models/product.js'
import ModelCart from '../../models/cart.js'
import { logger } from "../../../utils/pino.js"

class ContainerProducts {
    async getAll() {
        try {
            const products = await ModelProduct.find().lean()
            return products
        } catch (error) {
            logger.info('No se encontraron productos en este momento');
            console.log(error);
        }
    }

    async pushProductCart(id, idUser) {
        try {
            const prod = await ModelProduct.findOne({ _id: id });
            
            if (!prod) throw new Error('El producto no existe');

            let cart = await ModelCart.findOne({ user: idUser });
            if (!cart) {
                cart = await ModelCart.create({ user: idUser });
            }

            const prodInCart = cart.products.find(product => product.name === prod.name)
            
            if (!prodInCart) {
                cart = await ModelCart.findOneAndUpdate(
                    { user: idUser },
                    {
                        $push: { products: prod },
                        $inc: { total: parseInt(prod.price) }
                    },
                    { new: true }
                );
            }



        } catch (error) {
            logger.info({ msg: error.message });
        }
    }
}

export default ContainerProducts