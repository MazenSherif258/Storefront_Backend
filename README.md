# Storefront Backend Project

## 1. Database Connection and Backend

- install docker-compose.yml file
- type `docker run storefront_backend` to run the container
- `docker exec -it storefront_backend bash`
- `su postgres`
- `psql postgres`
- `\c <storefront>`
- database running on port 5416 mapped to 5432 in the docker container
- Backend is running on port 3000 by default, you can change it by changing its ENV variable

## 2. Enivroment Variables

- ### Database

  POSTGRES_HOST=localhost
  POSTGRES_DB=storefront
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=root
  POSTGRES_PORT=5416
  ENV=dev
  BACKEND_PORT=3000

- ### Bcrypt

  BCRYPT_PASSWORD=mazensecretkey
  SALT_ROUNDS=10

- ### JWT
  TOKEN_SECRET=mazonasecret

## 3. Added Scripts

- `npm run db:up` to run up migrations
- `npm run db:down` to run down migrations
- `npm run db:reset` to run all down migrations
- `npm run build` to compile ts to js
- `npm run test` to prepare testing enviroment and run tests

## 4. Package initialization

#### Type `npm install` to install all packages
