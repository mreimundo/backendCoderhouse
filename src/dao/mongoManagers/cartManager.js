const cartModel = require('../models/cartModel')
const productModel = require('../models/productModel')

class CartManagerMDB {

    async getCarts() {
        try{
            const carts = await cartModel.find()
            return carts
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async getCartById(id) {
        try{
            const cart = await cartModel.findById(id).lean()
            return cart
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addCart(){
        try{
            const newCart = await cartModel.create({})
            return newCart
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    async addProductToCart(cartId, productId, amount){
        try {
            let cart = await this.getCartById(cartId)
            const product = await productModel.findById(productId)
            const productToAdd = cart.products.findIndex(product => product.product._id == productId)
            if(!amount){
                if(productToAdd < 0){
                    cart.products.push({product: productId})
                }else{
                    cart.products[productToAdd].quantity ++
                }
            }else{
                cart.products[productToAdd].quantity = amount
            }
            let result = await cartModel.updateOne({_id:cartId}, cart) 
            return result          
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProducts (cartId, newProducts){
        try {
            const cart = await this.getCartById(cartId)
            cart.products = newProducts
            await cartModel.updateOne({_id:cartId}, cart)
            return newProducts
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(cartId, productId){
        try {
            const cart = await this.getCartById(cartId)
            // @ts-ignore
            const productToDelete = cart.products.find(product => product.product._id == productId)
            // @ts-ignore
            const index = cart.products.indexOf(productToDelete)
            if(index < 0){
                throw new Error('Product not found')
            }
            // @ts-ignore
            cart.products.splice(index, 1)
            // @ts-ignore
            const result = cartModel.updateOne({_id:cartId}, cart)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteAllProducts(cartId){
        try {
            const cart = await this.getCartById(cartId)
            // @ts-ignore
            cart.products = []
            // @ts-ignore
            const result = cartModel.updateOne({_id:cartId}, cart)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


module.exports = CartManagerMDB