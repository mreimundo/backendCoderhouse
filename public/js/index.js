const productItem = document.querySelector('.product-item')
const addToCartButton = document.getElementById('add-to-cart-button')
const seeCartButton = document.querySelector('.see-cart-button')

const cartId = seeCartButton.id

const addToCart = async (event) => {
    const productId = event.target.parentNode.getAttribute('id')
    const quantity = event.target.previousElementSibling.children[1].textContent
    await fetch(`/api/carts/${cartId}/product/${productId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({quantity}),
    })
    .then(() => alert('Item añadido al carrito!'))

    //reset cantidad
    event.target.previousElementSibling.children[1].textContent = 1
}


const seeCart = async (event) =>{
    window.location.href = `/cart/${cartId}`
}


const decreaseQuantity = (event) =>{
    const quantity = + event.target.nextElementSibling.textContent
    if (quantity > 0){
        event.target.nextElementSibling.textContent = quantity - 1
    }
}

const increaseQuantity = (event) =>{
    const stock = +event.target.parentNode.previousElementSibling.textContent.split(' ')[0]
    const quantity = + event.target.previousElementSibling.textContent
    if(quantity < stock) {
        event.target.previousElementSibling.textContent = quantity + 1
    }
}