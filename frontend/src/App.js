import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Scene from './components/Scene';
import './index.css';

// A simple database of cities and their coordinates
const cityData = {
  "London": { lat: 51.5074, lon: -0.1278 },
  "Tokyo": { lat: 35.6895, lon: 139.6917 },
  "New York": { lat: 40.7128, lon: -74.0060 },
  "Sydney": { lat: -33.8688, lon: 151.2093 },
  "Cairo": { lat: 30.0444, lon: 31.2357 },
  "Moscow": { lat: 55.7558, lon: 37.6173 },
  "Rio de Janeiro": { lat: -22.9068, lon: -43.1729 },
};

function App() {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    // Fetch initial city list from the backend
    axios.get('http://localhost:3001/api/cities')
      .then(response => setCities(response.data.map(name => ({ name, ...cityData[name] }))))
      .catch(error => console.error("Error fetching cities:", error));
  }, []);

  const handleAddCity = () => {
    if (newCity && cityData[newCity] && !cities.find(c => c.name === newCity)) {
      const updatedCities = [...cities, { name: newCity, ...cityData[newCity] }];
      setCities(updatedCities);
      // Persist to backend
      axios.post('http://localhost:3001/api/cities', { cities: updatedCities.map(c => c.name) })
        .catch(error => console.error("Error saving cities:", error));
      setNewCity('');
    } else {
      alert("City not found or already added!");
    }
  };

  const handleRemoveCity = (cityName) => {
    const updatedCities = cities.filter(c => c.name !== cityName);
    setCities(updatedCities);
    // Persist to backend
    axios.post('http://localhost:3001/api/cities', { cities: updatedCities.map(c => c.name) })
      .catch(error => console.error("Error saving cities:", error));
  };

  const getLocalTime = (lat, lon) => {
    // This is a simplified time calculation. A robust solution would use a timezone library.
    const date = new Date();
    const utcOffset = lon / 15; // Each 15 degrees of longitude is approx 1 hour
    const localTime = new Date(date.getTime() + (utcOffset * 3600000));
    return localTime.toLocaleTimeString();
  };

  return (
    <div className="w-full h-full">
      <Scene cities={cities} />
      <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 rounded-br-lg">
        <h1 className="text-2xl font-bold">World Clock</h1>
        <div className="my-4">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Add a city (e.g., Sydney)"
            className="bg-gray-800 text-white p-2 rounded-l"
          />
          <button onClick={handleAddCity} className="bg-blue-600 p-2 rounded-r">
            Add
          </button>
        </div>
        <ul>
          {cities.map(city => (
            <li key={city.name} className="flex justify-between items-center my-2">
              <span>{city.name} ({getLocalTime(city.lat, city.lon)})</span>
              <button onClick={() => handleRemoveCity(city.name)} className="bg-red-600 text-xs px-2 py-1 rounded">
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
