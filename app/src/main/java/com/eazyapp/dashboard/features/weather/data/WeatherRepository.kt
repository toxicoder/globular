package com.eazyapp.dashboard.features.weather.data

import com.eazyapp.dashboard.features.weather.domain.CurrentWeather
import javax.inject.Inject

class WeatherRepository @Inject constructor(
    private val weatherApiService: WeatherApiService
) {
    suspend fun getWeatherData(): Result<CurrentWeather> {
        return try {
            val weatherDto = weatherApiService.getCurrentWeather(
                // Replace with actual coordinates
                lat = 40.7128,
                lon = -74.0060,
                apiKey = "YOUR_API_KEY" // Replace with your actual API key
            )
            Result.success(CurrentWeather(temp = weatherDto.main.temp, condition = "Sunny"))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
