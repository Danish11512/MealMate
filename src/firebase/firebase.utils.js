import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAlgB-GPO41zHT06pwwdS10O41SPq_TPfY",
	authDomain: "meal-mate-dfa55.firebaseapp.com",
	projectId: "meal-mate-dfa55",
	storageBucket: "meal-mate-dfa55.appspot.com",
	messagingSenderId: "432171471215",
	appId: "1:432171471215:web:2339487e26433ad62e589a",
	measurementId: "G-FXYLT3YYJY"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const fetch = require("node-fetch");
const SPOONACULAR_API_KEY = "c596eb18f99d49ea8d8895ef5f10840d";

const generateId = () =>
{
	return Math.random().toString(36).substr(2, 9);
};

export const createUserProfileDocument = async (userAuth, additionalData) =>
{
	if(!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if(!snapShot.exists)
	{
		const { displayName, email, uid } = userAuth;
		const allergies = [];
		const diet = "";
		const preferredCuisineType = "";
		const previousRecipes = [];
		const calendarId = await initializeCalendar()

		try
		{
			if(calendarId === null)
				throw new Error("Error initializing calendar");

			await userRef.set({
				uid,
				displayName,
				email,
				allergies,
				diet,
				preferredCuisineType,
				previousRecipes,
				calendarId,
				...additionalData
			});
		}
		catch(error)
		{
			console.log('Error creating user', error.message);
		}
	}

	return userRef;
}

export const getUserDetails = async (uid) =>
{
	const userRef = firestore.doc(`users/${uid}`);
	const snapShot = await userRef.get();
	return snapShot.data();
}

export const changeSurveyAnswers = async (uid, allergies, diet, preferredCuisineType) =>
{
	let updateObject = {};

	if(allergies !== undefined && allergies !== null)
		updateObject.allergies = allergies;

	if(diet !== undefined && diet !== null)
		updateObject.diet = diet;

	if(preferredCuisineType !== undefined && preferredCuisineType !== null)
		updateObject.preferredCuisineType = preferredCuisineType;

	await firestore.doc(`users/${uid}`).update(updateObject);
}


export const initializeCalendar = async () =>
{
	let newCalendarRef = firestore.collection("calendars").doc();
	const id = newCalendarRef.id;
	const schedule = {}
	try
	{
		await newCalendarRef.set({
			id,
			schedule
		});

		return id;
	}
	catch(error)
	{
		console.log('Error creating user', error.message);
	}
	return null;
}

export const getCalendarFull = async (calendarId) =>
{
	const calendarRef = firestore.doc(`calendars/${calendarId}`);
	const snapShot = await calendarRef.get();
	return snapShot.data();
}

export const addMealToDay = async (calendarId, recipeId, date, time, calendar=null) =>
{
	if(date instanceof Date)
		date = date.toDateString();

	const calendarRef = firestore.doc(`calendars/${calendarId}`);
	let calendarData = calendar
	const mealId = generateId()

	if(!calendarData)
	{
		const snapShot = await calendarRef.get();
		calendarData = snapShot.data();
	}

	if(date in calendarData.schedule)
	{
		calendarData.schedule[date].meals.push({mealId, recipeId, time});
	}
	else
	{
		let dateObject = {totalCalories:0, totalFat:0, meals:[{mealId, recipeId, time}]};
		calendarData.schedule[date] = dateObject;
	}

	try{
		calendarRef.set(calendarData);
	}
	catch(error)
	{
		console.log("Could not add Meal to Day");
	}

	return [calendarData, mealId];
}

export const removeMealFromDay = async (calendarId, mealId, date, calendar=null) =>
{
	if(date instanceof Date)
		date = date.toDateString();

	const calendarRef = firestore.doc(`calendars/${calendarId}`);
	let calendarData = calendar

	if(!calendarData)
	{
		const snapShot = await calendarRef.get();
		calendarData = snapShot.data();
	}

	if(date in calendarData.schedule)
	{
		for(let i =0; i < calendarData.schedule[date].meals.length;i ++)
			if(calendarData.schedule[date].meals[i].mealId === mealId)
			{
				calendarData.schedule[date].meals.splice(i, 1);
				break;
			}

		try{
			calendarRef.set(calendarData);
		}
		catch(error)
		{
			console.log("Could not remove Meal from Day");
		}

		return calendarData;
	}

	return null;
}

export const editMealInDay = async (calendarId, mealId, date, newTime, calendar=null) =>
{
	if(date instanceof Date)
		date = date.toDateString();

	const calendarRef = firestore.doc(`calendars/${calendarId}`);
	let calendarData = calendar

	if(!calendarData)
	{
		const snapShot = await calendarRef.get();
		calendarData = snapShot.data();
	}

	if(date in calendarData.schedule)
	{
		for(let i =0; i < calendarData.schedule[date].meals.length;i ++)
			if(calendarData.schedule[date].meals[i].mealId === mealId)
			{
				calendarData.schedule[date].meals[i].time = newTime;
				break;
			}

		try{
			calendarRef.set(calendarData);
		}
		catch(error)
		{
			console.log("Could not edit Meal In Day");
		}

		return calendarData;
	}

	return null;
}

export const getCalendarDay = async (calendarId, date, calendar=null) =>
{
	if(date instanceof Date)
		date = date.toDateString();

	const calendarRef = firestore.doc(`calendars/${calendarId}`);
	let calendarData = calendar

	if(!calendarData)
	{
		const snapShot = await calendarRef.get();
		calendarData = snapShot.data();
	}

	if(date in calendarData.schedule)
	{
		return calendarData.schedule[date];
	}

	return null;
}

export const addDays = (date, days) =>
{
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export const getCalendarCurrentWeek = async (calendarId, date, calendar=null) =>
{
	if(date instanceof String)
		date = Date.parse(date);

	const calendarRef = firestore.doc(`calendars/${calendarId}`);
	let calendarData = calendar
	let weekObject = {}

	if(!calendarData)
	{
		const snapShot = await calendarRef.get();
		calendarData = snapShot.data();
	}

	for(let i=0; i <= 7;i++)
	{
		let newDate = addDays(date, i).toDateString();
		weekObject[newDate] = calendarData.schedule[newDate] || {totalCalories:0, totalFat:0, meals:{}}
	}

	return weekObject;
}


export const getCalendarDateRange = async (calendarId, startDate, endDate, calendar=null) =>
{
	if(startDate instanceof String)
		startDate = Date.parse(startDate);

	if(endDate instanceof String)
		endDate = Date.parse(endDate);

	if(startDate > endDate)
		return "INVALID RANGE";

	const calendarRef = firestore.doc(`calendars/${calendarId}`);
	let calendarData = calendar
	let rangeObject = {}

	if(!calendarData)
	{
		const snapShot = await calendarRef.get();
		calendarData = snapShot.data();
	}

	let newDate = startDate.toDateString()
	for(let i=0; newDate !== endDate.toDateString();i++)
	{
		newDate = addDays(startDate, i).toDateString();
		rangeObject[newDate] = calendarData.schedule[newDate] || {totalCalories:0, totalFat:0, meals:{}}
	}

	return rangeObject;
}

// Saves recipe to db
// Takes: id as string
export const addRecipe = async (id) =>
{
    try
    {
        let recipe = await getRecipeById(id);

        await firestore.collection("recipes").doc(id).set({
            title: recipe["title"],
            imageUrl: recipe["image"],
            sourceUrl: recipe["sourceUrl"],
            // ingredients: recipe[""],
            servings: recipe["servings"],
            readyInMinutes: recipe["readyInMinutes"],
            summary: recipe["summary"],
            aggregateLikes: recipe["aggregateLikes"],
            cheap: recipe["cheap"]
        })

        console.log("Saved recipe successfully :)")
    }
    catch(error)
    {
        console.log("Error saving recipe :(", error.message);
    }
}

// Gets recipe from db
// Takes: id as string
export const getRecipe = async (id) =>
{
    try
    {
        let recipeRef = firestore.collection("recipes").doc(id);
        let recipe = await recipeRef.get();
        return recipe.data();
    }
    catch(error)
    {
        console.log("Error getting recipe :(", error.message);
    }
}

// Gets recipe from spoonacular using id
// Takes: Id as string or numeric type, up to you bb <3
// Returns: Whole recipe object
export const getRecipeById = async (id) =>
{
	let queryString = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;
    let response = await fetch(queryString, { method: "GET" });

    if(response.status === 200) {
        let response_json = await response.json(); // Doesn't return json object, returns js object
        return response_json;
    }
    else {
        return "Something went wrong with the search"
    }
}

// Searches recipe in spoonacular
// Takes: query string, diet(only one diet per search, empty string if no diet), intolerances (as array, empty array if no intolerances)
// Returns: Array of objects with id, title, image, and imageType field
export const searchRecipe = async (searchQuery, diet, intolerances) =>
{
    let intolerance_str = intolerances.join(",");
    console.log(intolerance_str);
    let query = searchQuery.split(' ');
    query = query.join("%20")

    let queryString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&intolerances=${intolerance_str}&diet=${diet}&number=30`;
    let response = await fetch(queryString, { method: "GET" });

    if(response.status === 200) {
        let response_json = await response.json();
        return response_json;
    }
    else {
        return "Something went wrong with the search"
    }
}
