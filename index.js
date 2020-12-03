const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cookieParser= require("cookie-parser")
const path = require("path");
const pug = require("pug");

const app = express();

const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});

app.set("view engine", "pug");
app.set("views", __dirname+"/views");

app.get("/", routes.index);
app.get("/login", routes.login);
app.post("/login", urlEncodedParser, routes.checkUserLogin)
app.get("/signup", routes.signup);
app.post("/register", urlEncodedParser, routes.registerUser);

app.listen(3000);