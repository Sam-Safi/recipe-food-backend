require("dotenv").config();
require("./mongo");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Recipe = require("./models/recipes");

const app = express();

app.use(cors());

const mongoose = require("mongoose");

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/find", async (req, res) => {
  const recepies = await Recipe.find();
  res.status(200).send(recepies);
});

app.get("/find/:id", async (req, res) => {
  const recipes = await Recipe.findById(req.params.id);
  res.status(200).send(recipes);
});

app.put("/update/:id", async (req, res) => {
  const recordUpdated = await Recipe.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  );
  console.log("recordUpdated:", recordUpdated);
  res.status(200).send({
    status: 204,
    result: recordUpdated
  });
});

app.post("/new", async (req, res) => {
  await Recipe.create(req.body);
  res.status(200).send("ok, added");
});

app.delete("/delete/:id", async (req, res) => {
  await Recipe.deleteOne({
    _id: req.params.id
  });
  res.status(200).send({ success: true });
});

const port = process.env.EXPRESS_PORT || 3000;
app.listen(port, () => {
  console.log("port: " + port);
});
