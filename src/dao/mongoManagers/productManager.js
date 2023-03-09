const productModel = require('../models/productModel')
const { logCyan, logYellow } = require('../../utils/consoleUtils')
const HttpError = require('../../utils/errorUtils')
const HTTP_STATUS = require('../../constants/apiConstants')
class ProductManagerMDB {
    
    async getProducts({limit, page, query, sort}) {
        let filter
        if(!query){
            filter =  {}
        }else if(query == 'true'){
            filter = {status: true}
        }else if(query == 'false'){
            filter = {status: false}
        }else{
            filter = {category: query}
        }
        const options = {
            sort: (sort ? {price: sort} : {}),
            limit: limit || 10,
            page: page || 1,
            lean: true
        }
        const products = await productModel.paginate(filter,options)
        return products
    }

    async getProductById(id) {
        const product = await productModel.findById(id)
        if(!product){
            throw new HttpError(HTTP_STATUS.NOT_FOUND, 'No product matches the specified ID')
        }
        return product
    }

    async addProduct(product) {
        await productModel.create(product)
        logCyan(`${product.title} added`)
        const newProduct = {
            status: product.status || true,
            thumbnails: product.thumbnails || [],
            ...product
        }
        return newProduct
    }

    async updateProduct(id, product) {
        const updatedProduct = await productModel.updateOne({_id: id}, product)
        logCyan(`${product.title ?? 'product'} modified`)
        return updatedProduct
    }

    async deleteProduct(id) {
        const deletedProduct = await productModel.deleteOne({_id: id})
        logYellow(`product deleted`)
        return deletedProduct
    }

}

module.exports = ProductManagerMDB