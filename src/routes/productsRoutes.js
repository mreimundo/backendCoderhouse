import { Router } from "express";
import ProductManager from '../ProductManager.js';
import { uploader } from "../utils.js";

const productsRoutes = Router();

let productManager = new ProductManager('./src/data/products.json');

// CREATE PRODUCT 
productsRoutes.post('', uploader.array('thumbnail'), async (req, res) => {
    let product = req.body
    let thumbnail = req.files ? (req.files.map(file => `/img/${file.originalname}`)) : [];
    let statusProduct = (product.status) ? product.status.toLowerCase()==="true"? true:false : true
    let productJson = { 
    ...product, 
    thumbnail: thumbnail, 
    price: +(product.price), 
    stock: +(product.stock),
    status: statusProduct
}
    let newProduct = await productManager.addProduct(productJson)
    let status = newProduct.includes("is load") ? "success" : "error";
    res.send({ status: status, message: newProduct })
});
// READ PRODUCTS 
productsRoutes.get('', async (req, res) => {
    let products = await productManager.getProducts()
    let limit = req.query.limit;
    if (!limit) return res.send({ status: "success", payload: products });
    let productLimit = products.filter((product, indice) => indice < limit);
    res.send({ status: "success", payload: productLimit })

})
// READ PRODUCTS BY ID 
productsRoutes.get('/:pid', async (req, res) => {
    let pid = +req.params.pid;
    let product = await productManager.getProductById(pid)
    let status = product.id > 0 ? "success" : "error";
    res.send({ status: status, payload: product })
});
// UPDATE PRODUCT 
productsRoutes.put('/:pid', uploader.array('thumbnail'), async (req, res) => {
    let pid = +req.params.pid
    let product = req.body
    let productTarget = await productManager.getProductById(pid)
    let price = (product.price) ? +(product.price) : productTarget.price;
    let stock = (product.stock) ? +(product.stock) : productTarget.stock;
    let statusProduct = (product.status) ? (product.status.toLowerCase()=="true")? true:false : productTarget.status;
    let thumbnailWhat = req.files[0] ? (req.files.map(file => `/img/${file.originalname}`)) : productTarget.thumbnail;
    let productJson = { ...product, thumbnail: thumbnailWhat, price: price, stock: stock, status: statusProduct }
    let updateProduct = await productManager.updateProduct(pid, productJson);
    let status = updateProduct.includes("updated product") ? "success" : "error";
    res.send({ status: status, message: updateProduct })
});
// DELETE PRODUCT 
productsRoutes.delete('/:pid', async (req, res) => {
    let pid = +req.params.pid

    let productDelete = await productManager.deleteProduct(pid);
    let status = productDelete.includes("removed product") ? "success" : "error";

    res.send({ status: status, message: productDelete })
});

export default productsRoutes