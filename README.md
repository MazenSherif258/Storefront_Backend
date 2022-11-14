# Storefront Backend Project

## 1. Database Connection

- install docker-compose.yml file
- type `docker run storefront_backend` to run the container
- `docker exec -it storefront_backend bash`
- `su postgres`
- `psql postgres`
- `\c <storefront>`
- database running on port 5416 mapped to 5432 in the docker container

## 2. Enivroment Variables

- ### Database

  POSTGRES_HOST=localhost<br>
  POSTGRES_DB=storefront<br>
  POSTGRES_USER=postgres<br>
  POSTGRES_PASSWORD=root<br>
  POSTGRES_PORT=5416<br>
  ENV=dev<br>

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
