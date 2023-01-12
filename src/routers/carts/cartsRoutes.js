const { Router } = require('express')
const CartManager = require( '../../managers/CartManager.js')

const cartsRoutes = Router();

let cartManager = new CartManager('./src/data/carts.json');

// Instanciar cart 
cartsRoutes.post('', async (req, res) => {
    let newCart = await cartManager.addCart()
    let status = newCart.includes("is load") ? "success" : "error"
    res.send({ status: status, message: newCart })
});
// Leer y obtener cart
cartsRoutes.get('', async (req, res) => {
    let carts = await cartManager.getCarts()
    let limit = req.query.limit;
    if (!limit) return res.send({ status: "success", payload: carts })

    let cartLimit = carts.filter((cart, indice) => indice < limit)

    res.send({ status: "success", payload: cartLimit })

})
// Leer por id de cart
cartsRoutes.get('/:cid', async (req, res) => {
    let cid = +req.params.cid;
    let cart = await cartManager.getCartById(cid)
    let productsCart = cart.products
    let status = cart.id > 0 ? "success" : "error"
    let message = cart.id > 0 ? productsCart : car
    res.send({ status: status, payload: message })
});
// Añadir producto al carrito
cartsRoutes.post('/:cid/products/:pid', async (req, res) => {
    let cid = +req.params.cid
    let pid = +req.params.pid
    let quantity = req.query.q
    !quantity ? quantity = 1 : quantity = quantity
    let addProduct = await cartManager.addProductToCart(cid, pid, quantity)
    let status = addProduct.includes("product id") ? "success" : "error"
    res.send({ status: status, message: addProduct })
});
// Eliminar producto del carrito 
cartsRoutes.delete('/:cid/products/:pid', async (req, res) => {
    let cid = +req.params.cid
    let pid = +req.params.pid
    let deleteProduct = await cartManager.deleteProductToCart(cid, pid)
    let status = deleteProduct.includes("product id") ? "success" : "error"
    res.send({ status: status, message: deleteProduct })
});
// Eliminar un carrito
cartsRoutes.delete('/:pid', async (req, res) => {
    let pid = +req.params.pid
    let cartDelete = await cartManager.deleteCart(pid);
    let status = cartDelete.includes("removed cart") ? "success" : "error"
    res.send({ status: status, message: cartDelete })
});

module.exports = cartsRoutes