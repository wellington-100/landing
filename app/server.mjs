import http from 'node:http'
import fs from 'node:fs'



const routes = {
    '/': 'index.html',
    '/style.css': 'css/style.css',
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
        
    } else {
        res.write('not found')
        res.end()
    }
})

// 3. start the server
server.listen(8888)