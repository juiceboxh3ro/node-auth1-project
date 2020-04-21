## How To Do

0. design database model

1. npm init -y
  This initializes a package.json and allows NPM packages to be installed

2. npm i express sqlite3 knex
  Bring in the packages that we need

3. npm i nodemon -D
  bring nodemon in as a development dependency

4. set up index.js, server.js, x/x-router.js, x/x-model.js, data/db-config.js

5. npx knex init
  initialize the knexfile.js

6. make knexfile.js less shit
  ```
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite3
    connection: {
      filename: './data/recipes.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
  ```

7. set up migrations
  npx knex migrate:make create-tables

8. create database
  npx knex migrate:latest

9. set up seeds
  npx knex seed:make 01-tablename
  npx knex seed:run

  seed can be run again to restore db after tinkering
