//import axios from 'axios';

const fetch = require("node-fetch");
const SPOONACULAR_API_KEY1 = "c596eb18f99d49ea8d8895ef5f10840d";
const SPOONACULAR_API_KEY2 = "46aecb3dc8b54eedaa242d3ca5a6b33d";

// Gets recipe from spoonacular using id
// Takes: Id as string or numeric type, up to you bb <3
// Returns: Whole recipe object or null
export const getRecipeById = async (id) => {
  try {
    let queryString = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY1}`;
    let response = await fetch(queryString, { method: "GET" });

    if (response.status === 200) {
      let response_json = await response.json(); // Doesn't return json object, returns js object
      return response_json;
    } else if (response.status === 402) {
      // If api limit is reached, use 2nd api key
      queryString = queryString.replace(
        SPOONACULAR_API_KEY1,
        SPOONACULAR_API_KEY2
      );
      let response2 = await fetch(queryString, { method: "GET" });

      if (response2 === 200) {
        let response_json2 = await response2.json();
        return response_json2;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting recipe", error.message);
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
// Returns: Array of objects width id, title, image, and imageType field or null if there was an error with search
export const searchRecipe = async (searchQuery, filters) => {
  try {
    let query = searchQuery.split(" ");
    query = query.join("%20");

    let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY1}&query=${query}&number=30`;
    if ("intolerances" in filters) {
      queryString += `&intolerances=${filters["intolerances"]}`;
    }

    if ("diet" in filters) {
      queryString += `&diet=${filters["diet"]}`;
    }

    if ("maxCarbs" in filters) {
      queryString += `&maxCarbs=${filters["maxCarbs"]}`;
    }

    if ("mealType" in filters) {
      // let type = filters["mealType"].split(" ");
      // type = type.join("%20");

      let type = "";

      if (filters["mealType"] === "breakfast") {
        type = "breakfast";
      } else if (filters["mealType"] === "brunch") {
        type = "salad,bread,soup,fingerfood,appetizer";
      } else if (
        filters["mealType"] === "lunch" ||
        filters["mealType"] === "dinner"
      ) {
        type = "main%20course,soup,salad";
      }

      queryString += `&type=${type}`;
    }

    if ("cuisine" in filters) {
      queryString += `&cuisine=${filters["cuisine"]}`;
    }

    if ("prepTime" in filters) {
      queryString += `&maxReadyTime=${filters["prepTime"]}`;
    }

    let response = await fetch(queryString, { method: "GET" });

    if (response.status === 200) {
      let response_json = await response.json();
      return response_json;
    } else if (response.status === 402) {
      queryString = queryString.replace(
        SPOONACULAR_API_KEY1,
        SPOONACULAR_API_KEY2
      );
      let response2 = await fetch(queryString, { method: "GET" });

      if (response2 === 200) {
        let response_json2 = await response2.json();
        return response_json2;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error with search :(", error.message);
  }
};

// Searches recipes only by cuisine
// Takes: cuisine string, check spoonacular site for supported cuisines
// Returns: Array of objects width id, title, image, and imageType field or null if there was an error with api
export const searchRecipeByCuisine = async (cuisine) => {
  try {
    let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY1}&cuisine=${cuisine}&number=30`;
    let response = await fetch(queryString, { method: "GET" });

    if (response.status === 200) {
      let response_json = await response.json();
      return response_json;
    } else if (response.status === 402) {
      // If api limit is reached, use 2nd api key
      queryString = queryString.replace(
        SPOONACULAR_API_KEY1,
        SPOONACULAR_API_KEY2
      );
      let response2 = await fetch(queryString, { method: "GET" });

      if (response2 === 200) {
        let response_json2 = await response2.json();
        return response_json2;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error with cuisine search :(", error.message);
  }
};
