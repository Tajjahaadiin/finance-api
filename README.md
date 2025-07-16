# Minimalist Finance API

    API for finance tracker

---

## Project Setup

- install Expreess

  - npm i express

- make main file index.js

  - create file
    ```bash
       touch index.js
    ```
  - implement basic express api
  - adding script in package.json
    ```json
        "start":"node index.js"
    ```

- Implementing environment variables
  - install dotenv
    ```bash
       npm i dotenv
    ```
- Implement Connect to Database postgres
  - istall knex.js dan postgresql
    ```bash
       npm i knex pg
    ```
  - instantiate knexfile.js for basic database config
    ```bash
       npx knex init
    ```
  - update knexfile.js to our needs
    ```js
    require("dotenv").config();
    // Update with your config settings.
    /**
     * @type { Object.<string, import("knex").Knex.Config> }
     */
    module.exports = {
      development: {
        client: "pg",
        connection: {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
        },
        migrations: {
          tableName: "knex_migrations",
          directory: "./db/migrations",
        },
        seeds: {
          directory: "./db/seeds",
        },
      },
    };
    ```
  ````
  + Update the .env
  ```bash
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=your_username
     DB_PASSWORD=your_secure_password
     DB_NAME=finance_tracker_db
  ````
  - make directory for databases
  ```bash
     mkdir -p db/migrations
  ```
  - create first migrations
  ```bash
     npx knex migrate:make create_transactions_table
  ```
  - replce migration file with
  ```js
    /**
  ```

* @param { import("knex").Knex } knex
* @returns { Promise<void> }
  \*/
  exports.up = function(knex) {
  return knex.schema.createTable('transactions', function(table) {
  table.increments('id').primary(); // Primary key, auto-increments
  table.string('type').notNullable(); // 'income' or 'expense'
  table.string('description').notNullable();
  table.bigInteger('amount').notNullable(); // Use bigInteger for currency to avoid float issues
  table.date('date').notNullable(); // Date of transaction
  table.timestamps(true, true); // Adds created_at and updated_at columns
  });
  };

/\*\*

- @param { import("knex").Knex } knex
- @returns { Promise<void> }
  \*/
  exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
  };

  ```

  ```

* initialize knex in index.js

```js
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);
```

- create Get method with select statement end point using knex

```js
app.get("/api/transactions", async (req, res) => {
  try {
    const transaction = await knex("transactions").select("*");
    res.status(200).json({ message: "transaction data", data: transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching transaction", error: error.message });
  }
});
```

- creating new endpoint for create new transaction

```js
app.post("/api/transactions", async (req, res) => {
  const { type, description, amount, date } = req.body;
  if (!type || !description || !amount || !date) {
    return res.status(400).json({ message: "Unvalid request body" });
  }
  try {
    const [id] = await knex("transactions")
      .insert({
        type,
        description,
        amount,
        date,
      })
      .returning("id");
    res.status(201).json({
      message: "successfully added transaction",
      data: id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error adding transaction", error: error.message });
  }
});
```

- run Finance API
  ```bash
     npm run start
  ```

---
