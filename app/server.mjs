import http from 'node:http'
import fs from 'node:fs'
import querystring from 'node:querystring'
import { randomUUID } from 'node:crypto'
import postgres from 'postgres'

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
        fs.readFile('data/product.json', (err, jsonData) => {
            res.write(jsonData)
            res.end()
        })
    } else if (req.url.startsWith('/api/orderinfo')) {
        let queryString = req.url.split('?')[1]
        let params = querystring.parse(queryString)

        fs.readdir('data/orders/', (err, files) => {
            files.forEach(file => {
                if(file.startsWith(params.order_id)){
                    fs.readFile(`./data/orders/${file}`, (err, jsonData) => {
                        if (err) {
                            res.write('Order not found!')
                            res.end()
                        } else {
                            let data = JSON.parse(jsonData)
                            if (data.orderPIN == params.pin) {
                                res.write(jsonData)
                            } else {
                                res.write('Not authorized!')
                            }
                            res.end()
                        }
                    })
                }
            })
        })

        
    } else if (req.url == '/api/order') {
        //extract data from req body
        let body = ''
        req.on('data', chunk => {
            body += chunk
            console.log(body)
        })
        req.on('end', () => {
            let data = JSON.parse(body)
            let uuid = randomUUID()
            data.id = uuid
            console.log(data)
            fs.writeFile(`data/orders/${uuid}.json`, JSON.stringify(data), (err) => {
                res.write(JSON.stringify({
                    message: 'order placed!'
                }))
                res.end()
            })
        })
    } else {
        res.write('not found')
        res.end()
    }
})

// 3. start the server
server.listen(8888)


// HW create the database with the name "landing_product_db"
//  - create the table "products (id, title ...)""
//  - create the table "orders (id, email ...)"
//  - insert, select, delete a few products and orders...
