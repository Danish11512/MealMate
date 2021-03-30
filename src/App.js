import React from 'react';
import './App.css';
import {addMealToDay, removeMealFromDay, editMealInDay, getCalendarDay, getCalendarCurrentWeek, getCalendarDateRange} from './firebase.utils';


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

	return(
		<div>
			App
			<button onClick = {addMeal}>Add Meal</button><br />
			<button onClick = {removeMeal}>Remove Meal</button><br />
			<button onClick = {editMeal} >Edit Meal</button><br />
			<button onClick = {getDay} >getDay</button><br />
			<button onClick = {getWeek} >getWeek</button><br />
			<button onClick = {getRange} >getRange</button><br />
		</div>
	);
}

export default App;