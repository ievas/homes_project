let pg = require("pg");
const cors = require("cors");
let express = require("express");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
let uuid = require("uuid");
const saltRounds = 10;

let client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/homes"
);
let app = express();
app.use(express.json());
app.use(cors());

let init = async () => {
  await client.connect();

  let SQL = `
  DROP TABLE IF EXISTS cart_items;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS properties;

  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE users(
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );

  CREATE TABLE properties(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    price INTEGER DEFAULT 584900,
    address VARCHAR(900) DEFAULT '1020 Maple Grove Drive
    Fairview, Arcadia 55987',
    bedrooms INTEGER DEFAULT 3,
    bathrooms INTEGER DEFAULT 2,
    sqft INTEGER DEFAULT 1785,
    status VARCHAR(455) DEFAULT 'Active',
    realtor VARCHAR(455) DEFAULT 'Homes ".."',
    description TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );
  CREATE TABLE cart_items (
    cart_item_id UUID PRIMARY KEY,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT now(),
    user_id UUID REFERENCES users(id) NOT NULL,
    property_id UUID REFERENCES properties(id) NOT NULL,
    CONSTRAINT user_property_unique UNIQUE (property_id, user_id)
  )
  `;
  await client.query(SQL);

  SQL = `
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor, description) VALUES(650000, '2456 Whispering Hills Circle, Lexington, KY 40511', 3, 2, 2200, 'Sale Pending', 'Peak Realty', 'A straightforward three-bedroom, two-bathroom home offers 2,200 sq. ft. of pragmatic space. This unit features luminescent living areas and a functional kitchen. It can''t be yours, as it is listed as ''Sale Pending''.');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor, description) VALUES(850000, '4747 Mountain Scape Trail, Reno, NV 89523', 4, 3, 4200, 'For Sale', 'Bluegrass Properties', 'Here’s a behemoth of a home with 4,200 sq. ft. that''s not just big—it''s comfortable. With four bedrooms and three bathrooms, it''s decked out with a kitchen that’s a showstopper for anyone who likes to feast. And the views? They add a whimsical touch. Listed by Bluegrass Properties.');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor, description) VALUES(590000, '3256 New Moon Drive, Charlotte, NC 28277', 3, 2, 2200, 'Sold', 'Peak Realty', 'This place at 3256 New Moon Drive is already sold, but let me tell you about it. It’s a decent setup with three bedrooms and two baths in a cozy 2,200 sq. ft. frame. The people who bought it must’ve seen something special.');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor, description) VALUES(530000, '611 Sunset Cliffs Blvd, San Diego, CA 92107', 2, 2, 2600, 'For Sale', 'Sierra Realty', 'Welcome to your coastal sanctuary at 611 Sunset Cliffs Blvd. Imagine chilling in this breezy two-bedroom, two-bath pad right by the beach. This 2,600 sq. ft. home features two bedrooms and two baths, offering a luxurious yet comfortable living space. Plus, the place comes with an extra dose of coastal vibe. The large windows and high ceilings allow for an abundance of natural light, enhancing the open, airy feel. This property is a jewel in San Diego’s real estate market.');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor, description) VALUES(650000, '1782 Maplewood Court, Lexington, KY 40511', 3, 2, 1800, 'For Sale', 'Queen City Estate', 'This is 1782 Maplewood Court: a house that makes an effort. At 1,800 sq. ft., this property manages three bedrooms and two bathrooms. It’s clear, simple, and straightforward. The design—uncomplicated, perhaps to a fault—might be just right for someone. Offered by Queen City Estate.');
  INSERT INTO properties(price, address, bedrooms, bathrooms, sqft, status, realtor, description) VALUES(3000000, '870 Twilight Peak Avenue, Carmel, CA 90230', 5, 3, 3500, 'Sale Pending', 'Homes Realty', 'Introducing a grand 3,500 sq. ft. structure that houses five bedrooms and three baths at 870 Twilight Peak Avenue: a unique, standalone opportunity in its locale. Features expansive views, approaches the magical, but falls just short of truly captivating., providing a serene escape from the ordinary. As the only house on the street, it promises unmatched solitude. Currently under a sale pending status through Homes Realty, this property awaits its next chapter.');
  `;
  await client.query(SQL);
};

let isLoggedIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token not provided");
    }
    let payload;
    try {
      payload = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error.message);
      let err = new Error("not authorized");
      err.status = 401;
      throw err;
    }

    let SQL = `SELECT id, username FROM users WHERE id=$1;`;
    let response = await client.query(SQL, [payload.id]);
    if (!response.rows.length) {
      const error = new Error("User not found");
      error.status = 401;
      throw error;
    }
    req.user = response.rows[0];
    next();
  } catch (error) {
    next(error);
  }
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
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let SQL = `INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *`;
    let response = await client.query(SQL, [
      uuid.v4(),
      req.body.username,
      hashedPassword,
    ]);
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
      let tokenPayload = {
        id: user.id,
        username: user.username,
      };
      let token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({ token });
    } else {
      res.status(401).send({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
});
app.get("/user", isLoggedIn, async (req, res, next) => {
  let userId = req.user.id;
  try {
    let SQL = `SELECT id, username FROM users WHERE id=$1`;
    let response = await client.query(SQL, [userId]);
    res.json(response.rows[0]);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch cart items" });
  }
});
app.get("/properties/:id", async (req, res, next) => {
  try {
    let SQL = `SELECT * FROM properties WHERE id=$1`;
    let response = await client.query(SQL, [req.params.id]);
    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.get("/users/cart", isLoggedIn, async (req, res, next) => {
  try {
    let SQL = `SELECT cart_items.cart_item_id, properties.address, properties.price FROM cart_items
    INNER JOIN properties ON properties.id = cart_items.property_id
    WHERE cart_items.user_id = $1;`;
    let response = await client.query(SQL, [req.user.id]);
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

app.post("/users/cart", isLoggedIn, async (req, res, next) => {
  try {
    let userId = req.user.id;
    let { property_id, quantity } = req.body;
    let SQL = `
      INSERT INTO cart_items (cart_item_id, user_id, property_id, quantity)
      VALUES (uuid_generate_v4(),$1, $2, $3)
      RETURNING
        cart_item_id,
        (select address from properties where properties.id = $2) as address,
        (select price from properties where properties.id = $2) as price`;
    let response = await client.query(SQL, [userId, property_id, quantity]);
    console.log(response.rows[0]);

    res.status(201).send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});
//update property table's status when a house is sold
//add owner field to the property table, update that with buyer's user id
//inventory get route select * from properties where owner_id is logged in users id
//create a house routes
//delete a house
//edit a house
//put a house for sale - change the house's status in the database
//add a token field to users table

//remove an item from cart
app.delete("/users/cart/:itemId", isLoggedIn, async (req, res, next) => {
  try {
    let { itemId } = req.params;
    let SQL = `DELETE FROM cart_items WHERE user_id = $1 AND cart_item_id = $2 RETURNING *`;
    let response = await client.query(SQL, [req.user.id, itemId]);
    if (response.rowCount === 0) {
      return res.status(404).send({ message: "House not found in cart" });
    }
    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});
//clear cart
app.delete("/users/cart", isLoggedIn, async (req, res, next) => {
  try {
    let { userId } = req.params;
    let SQL = `DELETE FROM cart_items WHERE user_id = $1 RETURNING *`;
    let response = await client.query(SQL, [userId]);
    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => console.log(`listening on port ${port}`));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.json({ error: err });
});
init();
