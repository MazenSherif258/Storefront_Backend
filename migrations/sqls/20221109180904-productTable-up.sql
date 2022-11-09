CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name varchar(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category varchar(50)
);
