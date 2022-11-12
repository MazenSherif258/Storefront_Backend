CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL
);
