import postgres from "postgres"
import fs from 'node:fs'

const sql = postgres('postgres://postgres:27102010Postgresql@localhost:5432/landing_product_db')

fs.readFile('data/product.json', async (err, jsonData) => {
    let products = JSON.parse(jsonData)
    for (const product of products) {
        await sql`
            INSERT INTO products (id, title, subtitle, description, image, tags, price_amount, price_currency) VALUES (
                ${product.id},
                ${product.title},
                ${product.subtitle},
                ${product.description},
                ${product.image},
                ${product.tags},
                ${product.price.amount},
                ${product.price.currency}
            )
        `;
    }
    await sql.end()
})
