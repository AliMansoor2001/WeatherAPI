function onWeather() {
    const city = document.getElementById("city").value
    const apiKey =  "ac170f82d211f2282cfc0f795376a14b"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const apiKey2 = "31537412e0a94919978141209252302"
    const imgUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey2}&q=${city}&aqi=no`
  
  fetch(url)
  .then(response => {
    if(!response.ok) {
      throw new Error("city not found!");
    } 
      return response.json();
    
  })
  .then(data => {
    const cityName = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    console.log(description)

    document.getElementById("temperature").innerText = `${temperature}° C`;
    document.getElementById("description").innerText = description;
    document.getElementById("city-name").innerText = `🗺️ ${cityName}, ${country}`;

    return fetch(imgUrl);
    })

    .then(response => response.json())
    .then(imageData => {
        if (imageData.current && imageData.current.condition.icon) {
            document.getElementById("weatherImg").src = "https:" + imageData.current.condition.icon;
            document.getElementById("weatherImg").style.display = "block";
        } else {
            document.getElementById("weatherImg").src = "fallback-image.jpg"; // Use a default image if none found
            document.getElementById("weatherImg").style.display = "block";
        }
  })
  
  .catch(error => {
    document.getElementById("weatherImg").src = "fallback-image.jpg";;
    document.getElementById("temperature").innerText = "";
    document.getElementById("description").innerText = "";
    document.getElementById("city-name").innerText = "City not Found!!";
    console.error("Error:", error);
  })
  
  }