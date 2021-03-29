import React,{useEffect} from 'react';
import './App.css';
import {addMealToDay} from './firebase.utils';


const App = () =>
{
	useEffect(()=>{
		const testing = async () =>
		{
			await addMealToDay("RXOhMOY4QqpcWOZ01iFb", 1, new Date(), "12:00pm");
		}
		testing();
	},[]);
	return(
		<div>
			App
		</div>
	);
}

export default App;