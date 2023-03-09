const cartModel = require('../models/cartModel.js')
const productModel = require('../models/productModel.js')
const { logCyan } = require('../../utils/consoleUtils.js')
const { HttpError } = require('../../utils/errorUtils.js')
const HTTP_STATUS = require('../../constants/apiConstants.js')
class CartManagerMDB {

    async getCarts() {
        const carts = await cartModel.find()
        return carts
    }

    async getCartById(id) {
        const cart = await cartModel.findById(id).lean()
        return cart
    }

    async addCart(){
        const newCart = await cartModel.create({})
        logCyan('New cart created')
        return newCart
    }

    async addProductToCart(cartId, productId, quantity){
        const updatedCart = await cartModel.findByIdAndUpdate(cartId, {
            $push: {
                products: {
                    product: productId,
                    quantity: quantity
                }
            }
        })
        logCyan(`product ${productId} added to cart`)
        return updatedCart
    }

    async updateProducts (cartId, newProducts){
        const cart = await this.getCartById(cartId)
        cart.products = newProducts
        await cartModel.updateOne({_id:cartId}, cart)
        logCyan(`product ${productId} updated`)
        return newProducts
    }

    async deleteProductFromCart(cartId, productId){
        const cart = await this.getCartById(cartId)
        const productToDelete = cart.products.find(product => product.product._id == productId)
        const index = cart.products.indexOf(productToDelete)
        if(index < 0){
            throw new HttpError(HTTP_STATUS.NOT_FOUND, 'Product not found')
        }
        cart.products.splice(index, 1)
        const result = cartModel.updateOne({_id:cartId}, cart)
        logCyan(`product ${productId} deleted from cart`)
        return result
    }

    async deleteAllProducts(cartId){
        const cart = await this.getCartById(cartId)
        cart.products = []
        const result = cartModel.updateOne({_id:cartId}, cart)
        logCyan('Cart empty')
        return result
    }
}


module.exports = CartManagerMDB