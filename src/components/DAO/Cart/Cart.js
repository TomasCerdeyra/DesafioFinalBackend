import ModelCart from "../../models/cart.js"
import ModelProduct from "../../models/product.js"
import { logger } from "../../../utils/pino.js"

class ContainerCart {
    async getCartUser(user) {
        const cart = await ModelCart.findOne({ user }).lean()
        return cart
    }

    async delete(id, user) {
        try {
            const prod = await ModelProduct.findOne({ _id: id })
            await ModelCart.findOneAndUpdate(
                { user: user },
                {
                    $pull: { products: { _id: id } },
                    $inc: { total: -parseInt(prod.price) }
                }
            );
        } catch (error) {
            logger.info(error)
        }
    }

    async getCartId(id) {
        const cart = await ModelCart.findOne({ id })
        return cart
    }

}

export default ContainerCart