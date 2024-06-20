// client side javascript
let products = []
let currentProductIndex = 0

const pageContent = document.querySelector('#pageContent')
const control = document.querySelector('#control')

function integrateElement(tag, content, parent) {
    let element = document.createElement(tag)
    element.innerText = content
    element.required = true
    parent.append(element)
    return element
}

function renderProductData(index) {

    pageContent.innerHTML = ''
    control.innerHTML = ''

    let product = products[index]

    integrateElement('h1', product.title, pageContent)

    let img = integrateElement('img', null, pageContent)
    img.src = product.image

    integrateElement('h2', product.subtitle, pageContent)
    integrateElement('p', product.description, pageContent)
    
    let tagsContainer = document.createElement('div')
    let tags = product.tags.split(',')
    tags.forEach(tag => {
        let link = document.createElement('a')
        link.href = `/`
        link.innerText = ` #${tag} `
        tagsContainer.append(link)
    })
    pageContent.append(tagsContainer)

    integrateElement('p', product.price_amount, pageContent)
    integrateElement('p', product.price_currency, pageContent)
    
    let button = integrateElement('button', 'BUY', pageContent)
    button.addEventListener('click', () => { orderProduct(product.id)})

    // controls
    let previousButton = integrateElement('button', '<<', control)
    previousButton.addEventListener('click', () => {
        currentProductIndex = (currentProductIndex > 0) ? currentProductIndex - 1 : currentProductIndex;
        renderProductData(currentProductIndex);
    });

    let nextButton = integrateElement('button', '>>', control)
    nextButton.addEventListener('click', () => {
        currentProductIndex = (currentProductIndex < 2) ? currentProductIndex + 1 : currentProductIndex;
        renderProductData(currentProductIndex);
    });

    let buttonOrderInfo = integrateElement('button', 'get order info', pageContent)
    buttonOrderInfo.addEventListener('click', () => {
        // HW5: rewrite the logic using DOM elements        -

        let orderId = prompt ('Enter order id: ')
        let pin = prompt('Enter pin code: ')

        fetch(`/api/orderinfo?order_id=${orderId}&pin=${pin}`)
            .then(response => response.json())
            .then(json => {
                if (json.product_id && json.order_quantity) {
                    alert(`
                        Product ID: ${json.product_id}\n
                        Quantity: ${json.order_quantity}
                    `)
                } else {
                    alert(json.message)
                }
            })
            .catch(err => {
                alert('Error fetching order info')
            })

    })
}

const orderProduct = (productID) => {

    let form = document.createElement('form')

    // email field
    let input = integrateElement('input', null, form)
    input.placeholder = 'enter your email...'
    input.id = 'orderEmail'
    input.type = 'email'

    // productId hidden field
    input = integrateElement('input', null, form)
    input.type = 'hidden'
    input.value = productID
    input.id = 'productId'
    
    // phone field
    input = integrateElement('input', null, form)
    input.placeholder = 'enter phone number...'
    input.id = 'orderPhone'

    // quantity field
    input = integrateElement('input', null, form)
    input.placeholder = 'quantity'
    input.type = 'number'
    input.id = 'orderQuantity'
    // set a max and min values (1-10)
    input.value = 1
    input.min = 1
    input.max = 10

    // PIN field
    input = integrateElement('input', null, form)
    input.placeholder = 'choose a secret PIN...'
    input.id = 'orderPIN'
    input.type = 'password'
    
    let button = integrateElement('button', 'CONFIRM ORDER', form)
    button.type = 'submit'

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        //HW1: validate the data form(no empty fields)  DONE!
        //HW2*: add more fields(phone, address...)      DONE!
        fetch('/api/order', {
            method: 'POST',
            body: JSON.stringify({
                productId: document.getElementById('productId').value,
                orderEmail: document.getElementById('orderEmail').value,
                orderPhone: document.getElementById('orderPhone').value,
                orderQuantity: document.getElementById('orderQuantity').value,
                orderPIN: document.getElementById('orderPIN').value
            })
        })
            .then(response => response.json())
            .then(json => {
                button.innerText = json.message
            })
            .catch(err => {
                alert('Error')
            })     
    })

    document.body.replaceChild(form, document.body.lastElementChild)



}

fetch('/api/product')
    .then(response => response.json())
    .then(json => {
        products = json
        renderProductData(currentProductIndex)
    })