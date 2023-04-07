const HTTP_STATUS = require("../constants/apiConstants.js");
const getDaos = require("../dao/misc/factory.js");
const { GetProductDTO, UpdateProductDTO, AddProductDTO } = require("../dao/dtos/products.dto.js");
const HttpError = require("../utils/errorUtils.js");

const { productsDao } = getDaos()

class ProductsService {
    async getProducts(filter = {}) {
        const products = await productsDao.getAll(filter)
        const productsPayloadDTO = []
        products.docs.forEach(product => {
            productsPayloadDTO.push(new GetProductDTO(product))
        });
        return productsPayloadDTO
    }

    async getProductById(pid) {
        if(!pid){
            throw new HttpError('Missing param', HTTP_STATUS.BAD_REQUEST)
        }
        const product = await productsDao.getById(pid)
        if(!product){
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }
        const productPayloadDTO = new GetProductDTO(product)
        return productPayloadDTO
    }

    async createProduct(productPayload, files){
        const { title, description, code, stock, price, category } = productPayload
        if(!title || !description || !code || !stock || !price || !category){
            throw new HttpError('Please include all the required fields', HTTP_STATUS.BAD_REQUEST)
        }
        const productPayloadDTO = new AddProductDTO(productPayload, files)
        const newProduct = productsDao.add(productPayloadDTO)
        return newProduct
    }

    async updateProduct(pid, productPayload){
        if(!pid || !productPayload){
            throw new HttpError('Please provide an id and a payload for the product', HTTP_STATUS.BAD_REQUEST)
        }
        const product = await productsDao.getById(pid)
        if(!product){
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }
        const productPayloadDTO = new UpdateProductDTO(productPayload)
        const updatedProduct = await productsDao.updateById(pid, productPayloadDTO)
        return updatedProduct
    }

    async deleteProduct(pid){
        if(!pid){
            throw new HttpError('Please specify a product ID', HTTP_STATUS.BAD_REQUEST)
        }
        const deletedProduct = await productsDao.delete(pid)
        return deletedProduct
    }

}

module.exports = ProductsService