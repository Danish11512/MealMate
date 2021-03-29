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

export const getCalendarFull = async (id) =>
{
	const calendarRef = firestore.doc(`calendars/${id}`);
    const snapShot = await calendarRef.get();
	return snapShot.data();
}

export const addMealToDay = async (id, recipeId, date, time) =>
{
	date = date.toDateString();
	const calendarRef = firestore.doc(`calendars/${id}`);
    const snapShot = await calendarRef.get();
	let calendarData = snapShot.data();

	if(date in calendarData.schedule)
	{
		calendarData.schedule[date].meals.push({recipeId, time});
	}
	else
	{
		let dateObject = {totalCalories:0, totalFat:0, meals:[{recipeId, time}]};
		calendarData.schedule[date] = dateObject;
	}

	try{
		calendarRef.set(calendarData);
	}
	catch(error)
	{
		console.log("Could not add Meal to Day");
	}

	return calendarData;
}

/*
getCalendarCurrentWeek()
getCalendarDay()
getCalendarDateRange()
addMealToDay()
removeMealFromDay()
editMealInDay()
*/