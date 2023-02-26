import ModelProduct from "../models/product.js";
import ModelCart from "../models/cart.js";

const home = async (req, res) => {
    try {
        const products = await ModelProduct.find().lean()
        res.render('home', { products: products, name: req.user.name })
    } catch (error) {
        console.log('lo se encontraron productos en este momento');
    }
}

const addCart = async (req, res) => {
    const { id } = req.params
    const idUser = req.user.id
    try {
        //Tomo el producto a agregar
        const prod = await ModelProduct.findOne({ _id: id });
        if (!prod) throw new Error('El producto no existe');

        //Verifico si el Usuario tiene un carrtio creado
        // Busca el carrito del usuario
        let cart = await ModelCart.findOne({ user: idUser });
        if (!cart) {
            // Si no existe, crea un nuevo carrito para el usuario
            cart = await ModelCart.create({ user: idUser });
        }

        cart = await ModelCart.findOneAndUpdate(
            { user: idUser },
            { $push: { products: prod } },
            { new: true }
        );

        res.redirect('/api/carrito')

    } catch (error) {
        console.log({ msg: error.message });
        res.redirect('/')
    }
}

export {
    home,
    addCart
}