const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes/tasks");
const { mongoConnect, getDb } = require("./utils/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

mongoConnect(() =>
  app.listen(3000, () => console.log("listening to port " + 3000))
);
