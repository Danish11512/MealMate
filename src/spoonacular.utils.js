//import axios from 'axios';

const fetch = require("node-fetch");
const SPOONACULAR_API_KEYS = ["c596eb18f99d49ea8d8895ef5f10840d", "46aecb3dc8b54eedaa242d3ca5a6b33d", "6a37f4e32e674edf86796454ce8dc8b7", "baa7a2e369eb42599d83a5e79692bb15"];

// Gets recipe from spoonacular using id
// Takes: Id as string or numeric type, up to you bb <3
// Returns: Whole recipe object or null
export const getRecipeById = async (id) => {
	try {
		let randomNum = Math.floor(Math.random() * SPOONACULAR_API_KEYS.length);
		let apiKey = SPOONACULAR_API_KEYS[randomNum];
		let queryString = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
		let response = await fetch(queryString, { method: "GET" });

		if (response.status === 200) {
			let response_json = await response.json(); // Doesn't return json object, returns js object
			return response_json;
		} else if (response.status === 402) { // If first chose api key is at its point limit try every single api key until one works
			let currentKey = SPOONACULAR_API_KEYS[randomNum];

			for (const key of SPOONACULAR_API_KEYS) {
				queryString = queryString.replace(currentKey, key);
				currentKey = key;

				let response2 = await fetch(queryString, { method: "GET" });
				if (response2.status === 200) {
					let response_json = await response2.json();
					return response_json;
				}
			}

			return null;
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

		let randomNum = Math.floor(Math.random() * SPOONACULAR_API_KEYS.length);
		let apiKey = SPOONACULAR_API_KEYS[randomNum];

		let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=30`;
		if ("intolerances" in filters) {
			queryString += `&intolerances=`;
			filters.intolerances.forEach((el, index) => {
				queryString += `${el.name}`;
				if(index !== filters.intolerances.length-1){
					queryString +=",";
				}
			});
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
		} else if (response.status === 402) { // If first chose api key is at its point limit try every single api key until one works
			let currentKey = SPOONACULAR_API_KEYS[randomNum];

			for (const key of SPOONACULAR_API_KEYS) {
				queryString = queryString.replace(currentKey, key);
				currentKey = key;

				let response2 = await fetch(queryString, { method: "GET" });
				if (response2.status === 200) {
					let response_json = await response2.json();
					return response_json;
				}
			}

			return null;
		} else {
			return null;
		}
	} catch (error) {
		console.log("Error with search :(", error.message);
	}
};
/*
export const searchRecipeBlank = async (filters) => {
	try {
		let randomNum = Math.floor(Math.random() * SPOONACULAR_API_KEYS.length);
		let apiKey = SPOONACULAR_API_KEYS[randomNum];

		let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=&number=30`;
		if ("intolerances" in filters) {
			queryString += `&intolerances=`;
			filters.intolerances.forEach((el, index) => {
				queryString += `${el.name}`;
				if(index !== filters.intolerances.length-1){
					queryString +=",";
				}
			});
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
		} else if (response.status === 402) { // If first chose api key is at its point limit try every single api key until one works
			let currentKey = SPOONACULAR_API_KEYS[randomNum];

			for (const key of SPOONACULAR_API_KEYS) {
				queryString = queryString.replace(currentKey, key);
				currentKey = key;

				let response2 = await fetch(queryString, { method: "GET" });
				if (response2.status === 200) {
					let response_json = await response2.json();
					return response_json;
				}
			}

			return null;
		} else {
			return null;
		}
	} catch (error) {
		console.log("Error with search :(", error.message);
	}
};
*/

// Searches recipes only by cuisine
// Takes: cuisine string, check spoonacular site for supported cuisines
// Returns: Array of objects width id, title, image, and imageType field or null if there was an error with api
export const searchRecipeByCuisine = async (cuisine) => {
	try {
		let randomNum = Math.floor(Math.random() * SPOONACULAR_API_KEYS.length);
		let apiKey = SPOONACULAR_API_KEYS[randomNum];
		let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisine}&number=30`;
		let response = await fetch(queryString, { method: "GET" });

		if (response.status === 200) {
			let response_json = await response.json();
			return response_json;
		} else if (response.status === 402) { // If first chose api key is at its point limit try every single api key until one works
			let currentKey = SPOONACULAR_API_KEYS[randomNum];

			for (const key of SPOONACULAR_API_KEYS) {
				queryString = queryString.replace(currentKey, key);
				currentKey = key;

				let response2 = await fetch(queryString, { method: "GET" });
				if (response2.status === 200) {
					let response_json = await response2.json();
					return response_json;
				}
			}

			return null;
		} else {
			return null;
		}
	} catch (error) {
		console.log("Error with cuisine search :(", error.message);
	}
};
