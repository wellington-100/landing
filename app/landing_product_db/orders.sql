

-- add an order in oarders table with total_price
INSERT INTO orders (id, product_id, order_email, order_phone, order_quantity, order_pin, total_price_amount, total_price_currency)
SELECT '6d2a6b74-3207-41fa-be56-369112ab53aa',
       p.product_id,
       'user1@eamil.com',
       '123456',
       3,
       '1111',
       p.price_amount * 3 AS total_price_amount,
       p.price_currency AS total_price_currency
FROM products p
WHERE p.product_id = 1001;

