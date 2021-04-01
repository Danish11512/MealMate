import React from 'react';
import './App.css';
import {addMealToDay, removeMealFromDay, editMealInDay, getCalendarDay, getCalendarCurrentWeek, getCalendarDateRange} from './firebase/firebase.utils';
// Recipe functions
import {addRecipe, getRecipe, getRecipeById, searchRecipe} from './firebase/firebase.utils';

const App = () =>
{
	let newMeal = ""
	const addMeal = async () =>
	{
		let someDate = new Date();
		let numberOfDaysToAdd = 6;
		someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
		await addMealToDay("RXOhMOY4QqpcWOZ01iFb", 2, someDate, "1:00pm");
		let response = await addMealToDay("RXOhMOY4QqpcWOZ01iFb", 5, new Date(), "12:00pm");
		newMeal = response[1];
		console.log(newMeal);
	}

	const removeMeal = async () =>
	{
		await removeMealFromDay("RXOhMOY4QqpcWOZ01iFb", newMeal, new Date());
	}

	const editMeal = async () =>
	{
		await editMealInDay("RXOhMOY4QqpcWOZ01iFb", newMeal, new Date(), "5:00am");
	}

	const getDay = async () =>
	{
		let response = await getCalendarDay("RXOhMOY4QqpcWOZ01iFb", new Date());
		console.log(response);
	}

	const getWeek = async () =>
	{
		let response = await getCalendarCurrentWeek("RXOhMOY4QqpcWOZ01iFb", new Date());
		console.log(response);
	}

	const getRange = async () =>
	{
		let someDate = new Date();
		let numberOfDaysToAdd = 14;
		someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
		let response = await getCalendarDateRange("RXOhMOY4QqpcWOZ01iFb", new Date(), someDate);
		console.log(response);
	}

    const addRecipeTest = async () =>
    {
        let id = "555555";
        await addRecipe(id);
    }

    const getRecipeTest = async () =>
    {
        let id = "555555";
        let response = await getRecipe(id);
        console.log(response);
    }

    const getRecipeByIdTest = async () =>
    {
        let response = await getRecipeById(716429)
        console.log(response);
    }

    const searchRecipeTest = async () =>
    {
        let searchQuery = "tomato rice";
        let diet = "";
        // let intolerances = ["gluten", "seafood"];
        let intolerances = [];

        let response = await searchRecipe(searchQuery, diet, intolerances);
        console.log(response);
    }

	return(
		<div>
			App
			<button onClick = {addMeal}>Add Meal</button><br />
			<button onClick = {removeMeal}>Remove Meal</button><br />
			<button onClick = {editMeal} >Edit Meal</button><br />
			<button onClick = {getDay} >getDay</button><br />
			<button onClick = {getWeek} >getWeek</button><br />
			<button onClick = {getRange} >getRange</button><br />
			<button onClick = {getRange} >getRange</button><br />
            <button onClick = {addRecipeTest}>Add Recipe</button><br />
            <button onClick = {getRecipeTest}>Get Recipe</button><br />
            <button onClick = {getRecipeByIdTest}>Get Recipe By Id</button><br />
            <button onClick = {searchRecipeTest}>Search Recipe</button><br />
		</div>
	);
}

export default App;