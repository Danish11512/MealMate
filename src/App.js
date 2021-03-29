import React,{useEffect} from 'react';
import './App.css';
import {initializeCalendar} from './firebase.utils';


const App = () =>
{
	useEffect(()=>{
		const testing = async () =>
		{
			await initializeCalendar();
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