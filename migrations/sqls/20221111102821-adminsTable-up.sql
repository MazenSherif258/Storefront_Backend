CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username varchar(100) NOT NULL UNIQUE,
    password varchar(100) NOT NULL
);
