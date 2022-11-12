CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status varchar(20) NOT NULL
);
