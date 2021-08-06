window.addEventListener('load', () => {
    let lon; 
    let lat; 
    const apiKey = 'Your API';
    let temperatureDescription = document.querySelector(".degree");
    let pressureDescription = document.querySelector(".pressure"); 
    let humidityDescription = document.querySelector(".humidity");
    let uvIndexDescription = document.querySelector(".uvIndex");
    let uvIndexScore = document.querySelector(".uvIndexScore");
    let temperatureFeel = document.querySelector(".temperatureFeel");

        //Get longitue and latitue from current position 
    if(navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(position => { 
            lon = position.coords.longitude; 
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

         //Get data with fetch and .then (then) use it when it's available 
        fetch(api)
        .then(response => { 
            return response.json(); 
        })
        .then(data => { 
            console.log(data)
            const {temp, pressure, humidity, uvi, clouds, wind_speed, rain, feels_like} = data.current;

        //set DOM elements from the API 
        temperatureDescription.innerHTML = Math.floor(temp - 273.15); 
        pressureDescription.innerHTML = pressure; 
        humidityDescription.innerHTML = humidity; 
        uvIndexDescription.innerHTML = uvi; 
        temperatureFeel.innerHTML = Math.floor(feels_like - 273.15);
        
        //Set UV index with description + color according to index value 
            if (uvi < 3) { 
                uvIndexScore.innerHTML = 'zwak'; 
                uvIndexScore.style.color = 'aquamarine';  
            } else if (uvi >= 3 && uvi < 6) { 
                uvIndexScore.innerHTML = 'matig'; 
                uvIndexScore.style.color = 'yellow';  
            } else if (uvi >= 6 && uvi < 8) { 
                uvIndexScore.innerHTML = 'hoog'; 
                uvIndexScore.style.color = 'orange'; 
            } else if (uvi >= 8 && uvi < 11) { 
                uvIndexScore.innerHTML = 'heel hoog'; 
                uvIndexScore.style.color = 'red'; 
            } else { 
                uvIndexScore.innerHTML = 'Extreem hoog!'; 
                uvIndexScore.style.color = 'purple'; 
            }

            //Set Skycons according to weathertype (NOTE: could also be a switch Case)
            let setIconFunction = () => { 
                let skycons = new Skycons({"color": "white"}); 
                if (temp > 260 && clouds < 20) { 
                skycons.add(document.getElementById('icon'), Skycons.CLEAR_DAY);
                } else if (temp > 260 && clouds <= 50) {
                skycons.add(document.getElementById('icon'), Skycons.PARTLY_CLOUDY_DAY);
                } else if (clouds > 80 && wind_speed < 5) { 
                skycons.add(document.getElementById('icon'), Skycons.CLOUDY);    
                } else if (wind_speed > 13) { 
                skycons.add(document.getElementById('icon'), Skycons.WIND);    
                } else if (rain > 1) { 
                skycons.add(document.getElementById('icon'), Skycons.RAIN);     
                } else if (rain > 15) { 
                skycons.add(document.getElementById('icon'), Skycons.SLEET);  
                } else if (snow > 3) { 
                skycons.add(document.getElementById('icon'), Skycons.SNOW);
                }

                skycons.play(); 
            }

            setIconFunction();
        })
    });

    } else { 
        h1.textContent = 'Zet je locatie aan om het weer op te halen :)';
    }

});


