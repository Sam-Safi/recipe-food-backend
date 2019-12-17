const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  ingredients: [],
  calories: String
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
