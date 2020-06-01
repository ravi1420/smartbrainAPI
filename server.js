const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "ravi",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

// 1st--> Sign in request
//Advnace function first function will run then req, res will be called automatically.
app.post("/signin", signin.handleSignin(db, bcrypt)); 
// 2nd--> Register user request
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
// 3--> Get profile by id request
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
// 4--> Image search successful update
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
// 5--> API handle
app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
  });
  
// Server port declaration
app.listen(3000, () => {
  console.log("App is running on port 3000");
});
