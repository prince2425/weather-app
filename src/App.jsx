import React,{useState} from "react";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import wicon from "../src/assets/wicon.png";
import axios from "axios";


const App = () => {

  const [search, setSearch]=useState("")
  const [loading, setLoading]= useState(false)
  const [temperature, setTemperature] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [cityName, setCityName] = useState("")
  const [weatherIcon, setWeatherIcon] = useState('8383')

  const API_KEY = "8189d2c95a4a73a6fa8ffd077aaa908f";   // from openweathermap

  const fetchWeather=async()=>{
    console.log(search);
    if(!search) return;
    setLoading(true)
    try{
     const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`) // API=>API Docs
     console.log(data)
     if(data.cod ===200){
      setTemperature(data.main.temp);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setCityName(data.name);
      setWeatherIcon(data.weather[0].icon);
     }
    }catch(error){
      console.log(error)
      setCityName("city not found")
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setWeatherIcon("01d");
    }
    setLoading(false)
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-950 to-black text-white ">
        {/* search bar & icon */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 mb-6 w-80 shadow-lg">
          <input
            type="text"
            placeholder="search "
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="flex-1 text-black outline-none px-2"
          />
          <FaSearch onClick={fetchWeather} className="text-gray-600 cursor-pointer" />
        </div>

        {/* weather icon */}
        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" className="w-40 mb-3" />

        {/* Temprature & CityName */}
        <h1 className="text-4xl font-bold mb-1">{loading?"loading...":temperature!==null?`${temperature}°C`:"__"}</h1>  {/* // temperature */}
        <h2 className="text-2xl mt-2 font-semibold">{cityName || "type to check temperature"}</h2> {/*  //cityname  */}

        {/* Huminity & Wind speed */}
        <div className="w-full max-w-md mt-6 flex flex-col md:flex-row items-center justify-between md:items-start">
          <div className="flex flex-col items-center">
            <WiHumidity className="text-3xl" />
            <span className="text-lg font-medium">{humidity!==null?`${humidity}%`:"--"}</span>
            <p className="text-sm">Humidity</p>
          </div>

          <div className="flex flex-col items-center">
            <FaWind className="text-3xl" />
            <span className="text-lg font-medium">{windSpeed!==null?`${windSpeed}km/h`:"--"}</span>
            <p className="text-sm">Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
