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

    const quantity = event.target.previousElementSibling.children[1].textContent
    fetch(`/api/carts/${currentCart}/product/${productId}`, {
        headers: {
            'Content-Type': 'application/json' 
        },
        method: 'POST',
        body: JSON.stringify({quantity})
    })
    .then(alert('Item agregado al carrito'))

    //reseteo cantidad
    event.target.previousElementSibling.children[1].textContent = 1
}


const seeCart = async (event) =>{
    if(!currentCart){
        return alert('Carrito vacio')
    }
    window.location.href = `/cart/${currentCart}`
}


const decreaseQuantity = (event) =>{
    const quantity = + event.target.nextElementSibling.textContent
    if (quantity > 0){
        event.target.nextElementSibling.textContent = quantity - 1
    }
}

const increaseQuantity = (event) =>{
    const quantity = + event.target.previousElementSibling.textContent
    event.target.previousElementSibling.textContent = quantity + 1
}