/*
createUserProfileDocument(userAuth, additionalData)
	- Creates user profile in firestore using firebase authentication object
	- Only to be used by backend group

initializeCalendar()
	- Creates Calendar document in firestore when a new user is created
	- Only to be used by backend group

getUserDetails(uid)
	- Retrieves all user details given the user's id which is found in the firebase authentication object
	- The User object has the following format: 
		User
		{
			uid: string,
			displayName: string,
			email: string,
			allergies: string[],
			diet: string,
			preferredCuisineType: string,
			previousRecipes: string[],
			calendarId: string
		}

changeSurveyAnswers(uid, allergies, diet, preferredCuisineType)
	- Changes a user's survey answers given the user's id and the relevant survey answers
	- If any parameter(other than uid) is null it will not be changed

getCalendarFull(calendarId)
	- Retrieves calendar document from firestore given calendar id which is found in the corresponding user document
	- The Calendar object has the following format:
		Calendar
		{
			id: string,
			schedule:
			{
				Date (ex. Mon Mar 29, 2021):
				{
					totalCalories: int,
					totalFat: int,
					Meals: [{mealId: string, recipeId: string, time: string},{mealId: string, recipeId: string, time: string}, ...]
				},
				Date (ex. Tue Mar 30, 2021):
				{
					totalCalories: int,
					totalFat: int,
					Meals: [{mealId: string, recipeId: string, time: string},{mealId: string, recipeId: string, time: string} ...]
				},
				...
			}
		}

addMealToDay(calendarId, recipeId, date, time, calendar=null)
	- Adds a meal to a day given the calendarId, recipeId, date, and time
	- calendar is an optional parameter that is the calendar data
	- It is recommended to provide the calendar parameter if previously retrieved to limit firestore calls
	- This function will issue its own call to the firestore if the calendar parameter is not provided 

removeMealFromDay(calendarId, mealId, date, calendar=null)
	- Removes a meal from a day provided the calendarId, mealId, and date
	- calendar is an optional parameter that is the calendar data
	- It is recommended to provide the calendar parameter if previously retrieved to limit firestore calls
	- This function will issue its own call to the firestore if the calendar parameter is not provided 

editMealInDay(calendarId, mealId, date, newTime, calendar=null)
	- Updates the time of a meal given the calendarId, mealId, date, and newTime
	- calendar is an optional parameter that is the calendar data
	- It is recommended to provide the calendar parameter if previously retrieved to limit firestore calls
	- This function will issue its own call to the firestore if the calendar parameter is not provided 

---------------------------------------------------------------------------------------------------------------------------------
The following functions are helper functions and everything returned from them can easily be recreated by using the data returned by
the getCalendarFull(calendarId) function. They only exist for convienence and do not require firebase knowledge to recreate.

getCalendarDay(calendarId, date, calendar=null)
	- Retrieves a specific day in calendar
	- calendar is an optional parameter that is the calendar data
	- It is recommended to provide the calendar parameter if previously retrieved to limit firestore calls
	- This function will issue its own call to the firestore if the calendar parameter is not provided 

getCalendarCurrentWeek(calendarId, date, calendar=null)
	- Retrieves 8 days from the calendar starting from and including the given date to one week after the date
	- Any date that does not exist in the calendar is filled with a template for the date
	- calendar is an optional parameter that is the calendar data
	- It is recommended to provide the calendar parameter if previously retrieved to limit firestore calls
	- This function will issue its own call to the firestore if the calendar parameter is not provided 

getCalendarDateRange(calendarId, startDate, endDate, calendar=null)
	- Retrieves all days starting from the startDate up to the endDate from the calendar
	- Any date that does not exist in the calendar is filled with a template for the date
	- calendar is an optional parameter that is the calendar data
	- It is recommended to provide the calendar parameter if previously retrieved to limit firestore calls
	- This function will issue its own call to the firestore if the calendar parameter is not provided 

---------------------------------------------------------------------------------------------------------------------------------
getRecipe(id)
	- Returns recipe details from database given the recipe id
	- Adds recipe to database if it does not exist
	- Recommended for most cases instead of the functions below

getRecipeFromDatabase(id)
	- Returns recipe details from database given the recipe id
	- Returns null if recipe is not in database

addRecipeToDatabase(id)
	- Adds recipe document to database given recipe id


*/