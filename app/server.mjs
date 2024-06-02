import http from 'node:http'
import fs from 'node:fs'
import xml2js from 'xml2js';



const routes = {
    '/': 'index.html',
    '/style.css': 'css/style.css',
    '/fav.png': 'images/fav.png',
    '/jsbook.png': 'images/jsbook.png',
}

// HW1*: logic with XML storage data
// HW2: adding a new jsonData: ["JS", "learning", "education", "2022", "programming", "IT"] -> refactor the code
const server = http.createServer((req, res) => {
   
    if (routes[req.url]) {
        fs.readFile(routes[req.url], (err, data) =>{
            
            // react only for the main page
            if (routes[req.url] == 'index.html'){

                //load the product from the .xml
                fs.readFile('data/product.xml', (err, xmlData) => {
                    xml2js.parseString(xmlData, (err, result) => {
                        let productData = result.book

                        data = data.toString()
                        
                        // prepare the logic tags mixing
                        let tagsArray = productData.tags[0].tag
                        for (let i = tagsArray.length - 1; i > 0; i--){
                            let x = Math.floor(Math.random() * (i + 1))
                            let tempTag = tagsArray[i]
                            tagsArray[i] = tagsArray[x]
                            tagsArray[x] = tempTag
                        }
                        let stringTags = tagsArray.map(tag => `<a href="/">#${tag}</a>`).join(' ')
    
                        // Server side rendering(SSR)
                        data = data.replace('{title}', productData.title[0])
                        data = data.replace('{image}', productData.image[0])
                        data = data.replace('{subtitle}', productData.subtitle[0])
                        data = data.replace('{description}', productData.description[0])
                        data = data.replace('{priceAmount}', productData.price[0].amount[0])
                        data = data.replace('{priceCurrency}', productData.price[0].currency[0])
                        data = data.replace('{tags}', stringTags)

                        
                        res.write(data)
                        res.end()
                    });

                })
            } else {
                res.write(data)
                res.end()
            }
        })
    } else {
        res.write('not found')
        res.end()
    }
})

// 3. start the server
server.listen(8888)