import http from 'node:http'
import fs from 'node:fs'
// 2. create the server object


// HW: modify the HTML file and server logic 
//     so you load a favicon / logo into the page

const server = http.createServer((req, res) => {
   
    if (req.url == '/') {
        // static file serving
        fs.readFile('index.html', (err, data) =>{
            res.write(data)
            res.end()
        })
    } else if (req.url == '/style.css') {
        // static file serving
        fs.readFile('style.css', (err, data) => {
            res.write(data)
            res.end()
        })
    } else if (req.url == '/fav.png') {
        // static file serving
        fs.readFile('fav.png', (err, data) => {
            res.write(data)
            res.end()
        })
    } else {
        res.write('not found')
        res.end()
    }
})

// 3. start the server
server.listen(8888)