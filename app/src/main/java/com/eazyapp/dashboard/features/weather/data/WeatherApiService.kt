package com.eazyapp.dashboard.features.weather.data

import retrofit2.http.GET
import retrofit2.http.Query

interface WeatherApiService {
    @GET("weather")
    suspend fun getCurrentWeather(
        @Query("lat") lat: Double,
        @Query("lon") lon: Double,
        @Query("appid") apiKey: String
    ): WeatherDto
}

data class WeatherDto(
    val main: MainDto
)

data class MainDto(
    val temp: Double
)
