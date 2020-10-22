This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Objective

This app allows the user to search for a city of their choice and display a real time 5 day weather forecast for the city.

## Technology Used

* Create React App
* Open Weather Map API
* Netlify Lambda Functions

## Project Use

When the user first arrives at the page, they will see a search bar located at the top right corner. The format of a search is demonstrated in the input by first typing in the city name. A list of search results will begin the populate under the search bar. The user will then make a selection from the dropdown and then click the `search` button. After initiating the search, the page will render a large card at the top with the current days weather and available hourly readings. Smaller cards underneath display a 5 day forecast of the city for a week.

## Project Highlights

### Search Suggestions

In order to generate the list of suggested cities listed for the user in the search bar component, I use a combination of filter and map in order to search a JSON file provided by Open Weather Map API. This file lists all cities supported by the API along with the numeric codes associated with each. These codes are the actual parameter sent to the API in order to retrieve the propper data. The search results are the first 10 matching citites for the user's search parameter.

### Environmental Variables

This application is deployed using Netlify. Netlify's platform provides developer's predefined environmental variables that they can make use within their applications. In order to use the variables for this application, I had to rename the Netlify variables in order to comply with Create React App's naming convention of appending all names with 'REACT_APP_' for environmental variables. I remapped all Netlify variables with this convention and was able to make use of some for the project. 

In order to protect my API key, I could not store it as an Environmental Variable within Create React App as these are all still available for the client to view. Netlify provides the ability to define variables straight from the development dashboard on their platform. This is where I defined my API key in order to use in my serverless function.

### Serverless Function API Call

In order to properly protect the API key granted to me by Open Weather Map API, I implemented a Netlify serverless function in order to make the call. Netlify functions are a service using AWS Lambda functions at their core. I created a simple function that receives the numeric code from the client application and conducts the API call to Open Weather Map. The resulting JSON payload is sent back to the client.

### Data Formatting

I initially found the raw API data received from Open Weather Map unwieldy for my purposes. The original data comes formatted as an array of 40 objects, each representing a weather measurement every 3 hours totaling into 5 days worth of measurements. In order to group this data by unique days, I wrote a function that was able to locate and record the first and last occurence of measurements for each day. I used these recorded indexes to slice and reformat so that the data was now an array of arrays. Each array only containing the objects representing a single day. This format made graphical rendering much easier.

