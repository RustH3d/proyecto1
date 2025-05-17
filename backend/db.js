const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "recetas",
  password: "L1nk3d",
  port: 5432,
});

module.exports = pool;
