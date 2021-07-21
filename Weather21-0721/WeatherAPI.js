import React,{ useState } from 'react'
import './weather.css';
const api ={
    key: "854e7f8d021230bcb1ad9ce31328d8e5",
    units:"metric"//!---這裡選用 公制溫度，亦可切換,
}
// console.log(api.key);

function WeatherAPI() {
    const[city, setCity] = useState('');
    const[weather, setWeather] = useState({});

    const search =evt => {
        if(evt.key === "Enter"){
            // fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api.key}`)
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${api.units}&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setCity('');
                //console.log(result);
            });
        }
    }

    return (
        <div className={
            (typeof weather.main != "undefined") ?
            ((weather.main.temp >25) ?
            "app red" : "app") : "app"
            }>
            <main>
                {/* //todo---搜尋欄--------------------- */}
                <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="搜尋想去的城市，獲取天氣資訊..."
                        onChange={e =>setCity(e.target.value)}
                        value={city}
                        onKeyPress={search}
                    />
                </div>
                    {(typeof weather.main != "undefined") ? (
                        <div>
                            {/* //todo---位置&時間 區塊-------------- */}
                            <div className="location-box">
                                {/* <div className="location">Taipei City, TW</div> */}
                                <div className="location">{weather.name}</div>
                                {/* <div className="date">{new Date().toDateString()}</div> */}
                                <div className="date">{new Date().toLocaleDateString()}</div>
                            </div>
                            {/* //todo---天氣顯示 區塊--------------- */}
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}°C
                                </div>
                                <div className="weather">{weather.weather[0].main}</div>
                                <div className="humidity">濕度:{weather.main.humidity}%</div>
                            </div>
                        </div>
                    ):('')}
            </main>
        </div>
    )
}

export default WeatherAPI
