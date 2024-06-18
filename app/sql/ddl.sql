-- create products table
CREATE TABLE products (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    tags VARCHAR(255),
    price_amount INT,
    price_currency VARCHAR(3)
);



-- add a product in products table
INSERT INTO products VALUES (
    1001, 
    'JavaScript for impatient programmers (ES2022 edition)', 
    'This book makes JavaScript less challenging to learn for newcomers by offering a modern view that is as consistent aspossible.', 'Some advanced language features are not explained, but references to appropriate material are provided – for example, to my other JavaScript books at ExploringJS.com, which are free to read online.\nThis book deliberately focuses on the language.\nBrowser-only features, etc are not described', 'https://pbs.twimg.com/media/FdjE3iJWQAE1sIa.jpg:large', 
    '["JS", "learning", "education", "2022", "programming", "IT"]', 
    10, 
    'EUR'
    );
