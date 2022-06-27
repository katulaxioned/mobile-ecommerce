const db = require("./util/database");
const express = require("express");
const bodyparser = require("body-parser");
const jsonWebToken = require("jsonwebtoken");
require("dotenv").config();

const userroutes = require("./routes/userroutes");
const storeroutes = require("./routes/storeroutes");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  if(req.headers && req.headers.authorization){
    let authorization = req.headers.authorization;
    jsonWebToken.verify(authorization.split(" ")[1], process.env.SECRET_JWT_CODE, (err, decode) => {
      if (err) { 
        req.loggedUser = undefined;
      } else {
        req.loggedUser = decode;
      }
      next();
    })
  } else {
    req.loggedUser = undefined;
    next();
  }
})

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/user", userroutes)
app.use("/store", storeroutes);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.use((err, req, res ,next) => {
  res.status(500);
  res.json({status: 500, msg: `Oops, something went wrong`, err: `${err}`})
})

async function isConnectDB() {
  try {
    await db();
    app.listen(port, () => {
      console.log(`Server is listing to port ${port}.`);
    });
  } catch (err) {
    console.log(`Something went wrong. server won't start. err msg: ${err}`)
  }
}

isConnectDB();