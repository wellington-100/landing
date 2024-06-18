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

-- create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    product_id INT,
    order_email VARCHAR(255),
    order_phone VARCHAR(255),
    order_quantity INT,
    order_pin VARCHAR(255),
    total_price_amount DECIMAL(10, 2),
    total_price_currency VARCHAR(3),
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE
);

