const locationForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector('img.time');
const icon = document.querySelector(".icon img");



const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  //update details template
  details.innerHTML = `                
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;


    //update night and day img
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    //Ternary Operator (?) (Less code but same thing as if statement)
    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

    time.setAttribute('src', timeSrc);


    //remove d-none class
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none")
    };;
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);


  console.log(weather);

  // return {
  //   cityDetails: cityDetails,
  //   weather: weather,
  // };
  //A shorter way to do an obj (Object Shorthand notation) is if the key and value are the same (weather: weather) you can just put one to save some code

  return {
    cityDetails,
    weather,
  };
};

locationForm.addEventListener("submit", (e) => {
  //prevent deafult reload
  e.preventDefault();

  //get the city name
  const city = locationForm.city.value.trim();
  locationForm.reset();

  //update UI with new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });



    //Set local storage
    localStorage.setItem('city', city);
});



//Check if city exists
if(localStorage.getItem('city')){
  updateCity(localStorage.getItem("city"))
  .then(data => {
    updateUI(data)
  }).catch((err) =>{
    console.log(err);
  })
}

