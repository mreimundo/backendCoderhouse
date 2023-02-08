const productItem = document.querySelector('.product-item')
const addToCartButton = document.getElementById('add-to-cart-button')

let currentCart;

const addToCart = async (event) =>{
    if(!currentCart){
        await fetch('/api/carts',{method: 'POST'})
        .then(response => response.json())
        .then(data => currentCart = data.cart._id);
    }
    productId = event.target.parentNode.getAttribute('id')
    fetch(`/api/carts/${currentCart}/product/${productId}`, {
        method: 'POST'
    })
    .then(alert('Item agregado al carrito'))
}


const seeCart = async (event) =>{
    if(!currentCart){
        return alert('Carrito vacio')
    }
    window.location.href = `/cart/${currentCart}`
}