const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const app = express();

let sessionOptions = session({
  secret: "JS is awesome",
  store: new MongoStore({ client: require("./db"), dbName: "ComplexApp" }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: "strict",
  },
});

app.use(sessionOptions);
app.use(flash());

const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", router);

module.exports = app;
