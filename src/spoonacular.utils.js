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
// Takes: query string, filter object in the below form, leave out any filters not entered by user
//  {
//    intolerances: [],
//    diet: ,
//    maxCarbs: ,
//    mealType: ,
//    cuisine: ,
//    prepTime: , // in minutes
//  }
// Returns: Array of objects with id, title, image, and imageType field or null if there was an error with search
export const searchRecipe = async (searchQuery, filters) => {
  let query = searchQuery.split(" ");
  query = query.join("%20");

  let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&number=30`;
  if("intolerances" in filters) {
    queryString += `&intolerances=${filters["intolerances"]}`;
  }

  if("diet" in filters) {
    queryString += `&diet=${filters["diet"]}`;
  }

  if("maxCarbs" in filters) {
    queryString += `&maxCarbs=${filters["maxCarbs"]}`;
  }

  if("mealType" in filters) {
    // let type = filters["mealType"].split(" ");
    // type = type.join("%20");

    let type = "";

    if(filters["mealType"] == "breakfast") {
      type = "breakfast"
    }
    else if(filters["mealType"] == "brunch") {
      type = "salad,bread,soup,fingerfood,appetizer"
    }
    else if(filters["mealType"] == "lunch" || filters["mealType"] == "dinner") {
      type = "main%20course,soup,salad";
    }

    queryString += `&type=${type}`;
  }

  if("cuisine" in filters) {
    queryString += `&cuisine=${filters["cuisine"]}`;
  }

  if("prepTime" in filters) {
    queryString += `&maxReadyTime=${filters["prepTime"]}`;
  }

  let response = await fetch(queryString, { method: "GET" });

  if (response.status === 200) {
    let response_json = await response.json();
    return response_json;
  } else {
    return null;
  }
};
