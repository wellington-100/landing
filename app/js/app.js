// client side javascript

function integrateElement(tag, content, parent) {
    let element = document.createElement(tag)
    element.innerText = content
    element.required = true
    parent.append(element)
    return element
}

function renderProductData(json) {
    let body = document.body

    integrateElement('h1', json.title, body)

    let img = integrateElement('img', null, body)
    img.src = '/jsbook.png'

    integrateElement('h2', json.subtitle, body)
    integrateElement('p', json.description, body)
    
    let tagsContainer = document.createElement('div')
    json.tags.forEach(tag => {
        let link = document.createElement('a')
        link.href = `/`
        link.innerText = ` #${tag} `
        tagsContainer.append(link)
    })
    body.append(tagsContainer)

    integrateElement('p', json.price.amount, body)
    integrateElement('p', json.price.currency, body)
    
    let button = integrateElement('button', 'BUY', body)
    button.addEventListener('click', () => {orderProduct(json.id)})
}

// order by user clicks:
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
    .then(json => renderProductData(json))