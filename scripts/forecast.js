//Key given from MyApps in Accuweather API
const key = "kwZ74ATAGzjBCD17NeRyX39v55yCPDzu";


//get weather info
const getWeather = async (id) => {

    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;


    const response = await fetch(base+query);
    const data = await response.json();
    
    return data[0];

}


//Get city info
const getCity = async (city) =>{
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/search";

    //the ? means it is a query parameter
    const query = `?apikey=${key}&q=${city}`;

    //this will put the two above const as a single parameter
    const response = await fetch(base + query);

    const data = await response.json();

    //API returns multiple cities with the same name -- BC it is an array we can use [0] so that we get the first element in it which is the closest to what we inputted
    //console.log(data[0]);
    return data[0];

};
