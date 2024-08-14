# react-demo

## App Setup

1. Install dependencies

```
npm install
```

### DB setup

1. Add a .env file by referring .env.sample example

2. Init knex config file (knexfile.js)

```
npx knex init
```

2. Make files to create tables in the DB

```
npx knex migrate:make <create_tableName>
```

3. create seed:  
```
npx knex seed:make seed_name
```

4. Create tables in the DB

```
npx knex migrate:latest
```

5. Populating the tables in the DB with seed data

```
npx knex seed:run
```

## Run app

```
node index.js
```
