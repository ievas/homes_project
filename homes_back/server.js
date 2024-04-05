let pg = require("pg");
const cors = require("cors");
let express = require("express");
let client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/homes"
);
let app = express();

let init = async () => {
  await client.connect();
  let SQL = `DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS properties;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );

  CREATE TABLE properties(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price TEXT NOT NULL,
    size TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );
  `;
  await client.query(SQL);
};

app.use(express.json());
app.use(cors());
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.get("/properties", async (req, res, next) => {
  try {
    let SQL = `SELECT * FROM properties;`;
    let response = await client.query(SQL);
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});
app.post("/signup", async (req, res, next) => {
  console.log("post signup");
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let SQL = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
    let response = await client.query(SQL, [req.body.username, hashedPassword]);
    let { password, ...userData } = response.rows[0];
    res.send(userData);
  } catch (error) {
    next(error);
  }
});
app.post("/signin", async (req, res, next) => {
  let { username, password } = req.body;
  try {
    let SQL = `SELECT * FROM users WHERE username = $1`;
    let response = await client.query(SQL, [username]);
    //if succesful
    let user = response.rows[0];
    let match = await bcrypt.compare(password, user.password);
    if (match) {
      let { password, ...userData } = user;
      res.send({ message: "Login successful", userData });
    } else {
      res.status(401).send({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
});
// app.get("/users/:id", async (req, res, next) => {
//   try {
//     let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//     let SQL = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
//     let response = await client.query(SQL, [req.body.username, hashedPassword]);
//     let { password, ...userData } = response.rows[0];
//     res.send(userData);
//   } catch (error) {
//     next(error);
//   }
// });

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => console.log(`listening on port ${port}`));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({ error: err });
});
init();
