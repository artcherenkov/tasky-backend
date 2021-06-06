const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const routes = require("./routes/tasks");
const { mongoConnect, getDb } = require("./utils/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

mongoConnect(() =>
  app.listen(PORT, () => console.log("listening to port " + PORT))
);
