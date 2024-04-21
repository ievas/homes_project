let pg = require("pg");
const cors = require("cors");
let express = require("express");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/homes"
);
let app = express();
app.use(express.json());
app.use(cors());

let init = async () => {
  await client.connect();
  let SQL = `DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS properties;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );

  CREATE TABLE properties(
    id SERIAL PRIMARY KEY,
    price INTEGER DEFAULT 584900,
    address VARCHAR(900) DEFAULT '1020 Maple Grove Drive
    Fairview, Arcadia 55987',
    bedrooms INTEGER DEFAULT 3,
    bathrooms INTEGER DEFAULT 2,
    sqft INTEGER DEFAULT 1785,
    status VARCHAR(455) DEFAULT 'Active',
    realtor VARCHAR(455) DEFAULT 'Homes ".."',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );
  `;
  await client.query(SQL);

  SQL = `
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor) VALUES(650000, '2456 Whispering Hills Circle, Lexington, KY 40511', 3, 2, 2200, 'Sale Pending', 'Peak Realty');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor) VALUES(850000, '4747 Mountain Scape Trail, Reno, NV 89523', 4, 3, 4200, 'For Sale', 'Bluegrass Properties');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor) VALUES(530000, '611 Sunset Cliffs Blvd, San Diego, CA 92107', 2, 2, 2600, 'For Sale', 'Sierra Realty');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor) VALUES(590000, '3256 New Moon Drive, Charlotte, NC 28277', 3, 2, 2200, 'Sold', 'Peak Realty');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor) VALUES(650000, '2456 Whispering Hills Circle, Lexington, KY 40511', 3, 2, 1800, 'For Sale', 'Queen City Estate');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor) VALUES(3000000, '870 Twilight Peak Avenue, Carmel, CA 90230', 5, 3, 3500, 'Sale Pending', 'Homes Realty');
  
        
        `;
  await client.query(SQL);
};

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
    if (response.rows.length === 0) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    let user = response.rows[0];
    let match = await bcrypt.compare(password, user.password);
    if (match) {
      let token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET || "skaidas",
        { expiresIn: "24h" }
      );
      console.log(token);
      res.json({ token });
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
