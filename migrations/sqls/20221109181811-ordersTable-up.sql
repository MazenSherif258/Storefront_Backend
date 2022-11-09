CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id int REFERENCES products(id),
    quantity int NOT NULL,
    user_id int REFERENCES users(id),
    status varchar(20) NOT NULL
);
