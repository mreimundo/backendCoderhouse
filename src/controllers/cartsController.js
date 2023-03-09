const CartManagerMDB = require("../dao/mongoManagers/cartManager.js");
const HTTP_STATUS = require ("../constants/apiConstants.js")
const { apiSuccessResponse } = require("../utils/apiUtils.js");
const { HttpError } = require("../utils/errorUtils.js");

const cartsDao = new CartManagerMDB()

class CartsController{

    static async getAll(req, res, next) {
        try {
            const cart = await cartsDao.getCarts() 
            const response = apiSuccessResponse(cart)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        const { cid } = req.params
        try {
            const cart = await cartsDao.getCartById(cid)
            if(!cart){
                throw new HttpError(HTTP_STATUS.NOT_FOUND, 'Cart not found')
            }
            const response = apiSuccessResponse(cart)
            res.status(HTTP_STATUS.OK).json(response) 
        } catch (error) {
            next(error)
        }
    }

    static async addCart(req,res,next) {
        try {
            const addCart = await cartsDao.addCart()
            const response = apiSuccessResponse(addCart)
            res.status(HTTP_STATUS.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async addProduct(req, res, next){
        try {
            const { cid, pid } = req.params
            const amount = +req.body?.amount || 1
            const addProduct = await cartsDao.addProductToCart(cid, pid, amount)
            const response = apiSuccessResponse(addProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async updateProducts(req, res, next){
        const { cid } = req.params
        const newProducts = req.body
        try {
            const updatedCart = await cartsDao.updateProducts(cid, newProducts)
            const response = apiSuccessResponse(updatedCart)
            res.status(HTTP_STATUS.OK).json(response)
            
        } catch (error) {
            next(error)
        }
    }   
    
    static async updateQuantity(req, res, next){
        const {cid, pid} = req.params
        const amount = req.body.quantity
        if(!amount){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'An amount of product must be provided')
        }
        try {
            const updateProduct = await cartsDao.addProductToCart(cid, pid, amount)
            const response = apiSuccessResponse(updateProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
    
    static async removeProducts(req, res, next){
        const {cid, pid} = req.params
        try {
            const deletedProduct = await cartsDao.deleteProductFromCart(cid, pid)
            const response = apiSuccessResponse(deletedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async clearCart(req, res, next){
        const { cid }= req.params
        try {
            const result = await cartsDao.deleteAllProducts(cid)
            const response = apiSuccessResponse(result)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartsController