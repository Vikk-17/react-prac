import { useState, useEffect } from 'react'
import './App.css'

function App() {

	const [weather, setWeather] = useState(null);
	const [city, setCity] = useState("London");
	const [inputCity, setInputCity] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");


	const mockWeatherData = {
		London: {
			city: 'London',
			country: 'UK',
			temperature: 18,
			description: 'Partly Cloudy',
			humidity: 65,
			windSpeed: 12,
			icon: '⛅'
		},
		Paris: {
			city: 'Paris',
			country: 'France',
			temperature: 22,
			description: 'Sunny',
			humidity: 55,
			windSpeed: 8,
			icon: '☀️'
		},
		Tokyo: {
			city: 'Tokyo',
			country: 'Japan',
			temperature: 16,
			description: 'Rainy',
			humidity: 80,
			windSpeed: 15,
			icon: '🌧️'
		},
		NewYork: {
			city: 'New York',
			country: 'USA',
			temperature: 25,
			description: 'Clear Sky',
			humidity: 45,
			windSpeed: 10,
			icon: '☀️'
		},
		Mumbai: {
			city: 'Mumbai',
			country: 'India',
			temperature: 32,
			description: 'Hot and Humid',
			humidity: 85,
			windSpeed: 6,
			icon: '🌡️'
		}
	};

	// simulate api call
	const fetchWeather = async (cityName) => {
		setLoading(true);
		setError('');

		try {
			await new Promise(resolve => setTimeout(resolve, 1000));

			const cityKey = cityName.replace(" ", "");
			const weatherData = mockWeatherData[cityKey];

			if(weatherData){
				setWeather(weatherData);
			} else {
				throw new Error("City is not found");
			}
		} catch(err) {
			setError("Weathe data not available for this city.");
			setWeather(null);
		} finally {
			setLoading(false);
		}
	};

	// load weather data when component mounts or city changes
	useEffect(()=>{
		fetchWeather(city);
	}, [city]);


	// handle search action
	const handleSubmit = (e) => {
		e.preventDefault();
		if(inputCity.trim()){
			setCity(inputCity.trim());
			setInputCity("");
		}
	};
	const quickCities = ["London", "Paris", "Tokyo", "New York", "Mumbai"];

  return (
	<>
		<div>Weather app</div>
		<div>
			<input
				type="text"
				onChange={e => setInputCity(e.target.value)}
				placeholder='Enter city name'
				onKeyDown={e => e.key === "Enter" && handleSubmit(e)}
			/>
			<button
				onClick={handleSubmit}
			>
				Search
			</button>
		</div>

		{/* Quick city buttons */}
		<div>
			{quickCities.map((cityName) => (
				<button
					key={cityName}
					onClick={() => setCity(cityName)}
				>
					{cityName}
				</button>
			))}
		</div>
		<div>{city}</div>

		{/* Weather card */}
		<div>
			{loading && (
				<div>Loading weather data</div>
			)}

			{
				error && (
					<div>{error}</div>
				)
			}

			{
				weather && !loading && !error && (
					<div>
						<div>{weather.icon}</div>
						<div>{weather.city}, {weather.country}</div>
						<div>{weather.temperature}</div>
					</div>
				)
			}
		</div>
	</>
  )

}


export default App
