CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    product_id int REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity int NOT NULL,
    order_id int REFERENCES orders(id)
);
