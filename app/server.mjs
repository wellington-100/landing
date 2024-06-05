import http from 'node:http'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'

const routes = {
    '/': 'index.html',
    '/style.css': 'css/style.css',
    '/app.js': 'js/app.js',
    '/fav.png': 'images/fav.png',
    '/jsbook.png': 'images/jsbook.png',
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