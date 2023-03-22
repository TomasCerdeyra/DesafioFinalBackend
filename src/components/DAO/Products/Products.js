import ModelProduct from "../../../models/product";
import { Logger } from "../../../utils/pino.js";

class ContainerProducts {

    async getAll() {
        try {
            const products = await ModelProduct.find().lean()
            return products
        } catch (error) {
            console.log(error);
        }
    }
}

export default ContainerProducts