import http from 'node:http'
import fs from 'node:fs'
import querystring from 'node:querystring'
import { randomUUID } from 'node:crypto'
import postgres from 'postgres'

const sql = postgres('postgres://postgres:27102010Postgresql@localhost:5432/landing_product_db')

const routes = {
    '/': 'index.html',
    '/style.css': 'css/style.css',
    '/app.js': 'js/app.js',
    '/fav.png': 'images/fav.png',
    '/jsbook1.png': 'images/jsbook1.png',
    '/jsbook2.jpg': 'images/jsbook2.jpg',
    '/jsbook3.jpg': 'images/jsbook3.jpg',
}

const server = http.createServer((req, res) => {
   
    if (routes[req.url]) {
        fs.readFile(routes[req.url], (err, data) =>{
            res.write(data)
            res.end()
        })
    } else if (req.url == '/api/product'){
        sql`SELECT * FROM products`.then(data => {
            res.write(JSON.stringify(data))
            res.end()
        })
    } else if (req.url.startsWith('/api/orderinfo')) {
        let queryString = req.url.split('?')[1]
        let params = querystring.parse(queryString)
        console.log(params)

        // get order INFO!
        sql`SELECT * FROM orders`.then(orderData => {
            const order = orderData.find(order => order.id.split('-')[0] === params.order_id)
            console.log(order.id)
            if (!order) {
                res.write(JSON.stringify({ message: 'Order not found!' }))
                res.end()
                return
            }

            if (order.order_pin === params.pin) {
                res.write(JSON.stringify(order))
            } else {
                res.write(JSON.stringify({ message: 'Not authorized!' }))
            }
            res.end()
        })

        
    } else if (req.url == '/api/order') {
        //extract data from req body
        let body = ''
        req.on('data', chunk => {
            body += chunk
            console.log(body)
        })
        req.on('end', () => {
            let order = JSON.parse(body)
            let uuid = randomUUID()
            const {
                productId,
                orderEmail,
                orderPhone,
                orderQuantity,
                orderPIN
            } = order
            
            sql`SELECT price_amount, price_currency FROM products WHERE id = ${productId}`.then(productData => {

                const priceAmount = productData[0].price_amount
                const priceCurrency = productData[0].price_currency
                const totalPriceAmount = priceAmount * orderQuantity
                const totalPriceCurrency = priceCurrency

                sql`INSERT INTO orders (id, product_id, order_email, order_phone, order_quantity, order_pin, total_price_amount, total_price_currency) VALUES (
                    ${uuid},
                    ${productId},
                    ${orderEmail},
                    ${orderPhone},
                    ${orderQuantity},
                    ${orderPIN},
                    ${totalPriceAmount},
                    ${totalPriceCurrency}
                )`.then(() => {
                    res.write(JSON.stringify({
                        message: 'order placed!',
                        orderId: uuid
                    }))
                    res.end()
                })
            })
        })
    } else {
        res.write('not found')
        res.end()
    }
})

// 3. start the server
server.listen(8888)
