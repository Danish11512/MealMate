//import axios from 'axios';

const fetch = require("node-fetch");
const SPOONACULAR_API_KEY = "c596eb18f99d49ea8d8895ef5f10840d";
const axios = require("axios");

// Gets recipe from spoonacular using id
// Takes: Id as string or numeric type, up to you bb <3
// Returns: Whole recipe object or null
export const getRecipeById = async (id) => {
  let queryString = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;
  let response = await fetch(queryString, { method: "GET" });

  if (response.status === 200) {
    let response_json = await response.json(); // Doesn't return json object, returns js object
    return response_json;
  } else {
    return null;
  }
};

// Searches recipe in spoonacular
// Takes: query string, diet(only one diet per search, empty string if no diet), intolerances (as array, empty array if no intolerances)
// Returns: Array of objects with id, title, image, and imageType field or null
export const searchRecipe = async (searchQuery, diet, intolerances) => {
  let query = searchQuery.split(" ");
  query = query.join("%20");

  let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&intolerances=${intolerances}&diet=${diet}&number=30`;
  let response = await fetch(queryString, { method: "GET" });

  if (response.status === 200) {
    let response_json = await response.json();
    return response_json;
  } else {
    return null;
  }
};
