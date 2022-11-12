# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index Route => '/api/products' `[GET]`
- Show Route => '/api/products/:id' `[GET]`
- Create Route => '/api/products' `[POST]` [token required]
- Update Route => '/api/products/:id' `[PUT]` [token required]
- Delete Route => '/api/products/:id' `[DELETE]` [token required]

##### Create/Update Body Parameters Required [name, price, category]

#### Users

- Index Route => '/api/users' `[GET]` [token required]
- Show Route => '/api/users/:id' `[GET]` [token required]
- Create N Route => '/api/users' `[POST]` [token required]
- Register Route => '/api/users/register' `[POST]` [sends jwt token]
- Login Route => '/api/users/login' `[POST]` [sends jwt token]
- Delete Route => '/api/users/:id' `[DELETE]` [token required]
- Update Route => '/api/users/:id' `[PUT]` [token required]

##### Create Body Parameters Required [ firstName/firstName[], lastName/lastName[], username/username[], password/password[] ]

##### Update Body Parameters Required [ firstName, lastName, username, password ]

#### Orders

- Index Route => '/api/orders' `[GET]`
- Show Route => '/api/orders/:id' `[GET]`
- Create Route => '/api/orders' `[POST]`
- Update Route => '/api/orders/:id' `[PUT]`
- Delete Route => '/api/orders/:id' `[DELETE]`
- Current Order by user Route => '/api/orders/currentOrder/:user_id' `[GET]` [token required]
- Add Product to Order Route => '/api/orders/:id/products' `[POST]` [token required]
- Remove Product from Order Route => '/api/orders/:order_id/products/product_id' `[DELETE]` [token required]

##### Create/Update Body Parameters Required [status, user_id]

##### Add Product to Order Body Parameters Required [product_id, quantity]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Scheme

#### Product

- products(id:serial, name:varchar, price:decimal, category:varchar)

#### User

- users(id:serial, firstName:varchar, lastName:varchar, username:varchar, password:varchar)

#### Orders

- orders(id:serial, user_id:int[foreign key to users table], status:varchar)

#### Order_Product

- order_product(id:serial, product_id:int[foreign key to products table], quantity:int, order_id:int[foreign key to orders table])
