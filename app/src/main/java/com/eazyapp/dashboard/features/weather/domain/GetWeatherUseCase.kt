package com.eazyapp.dashboard.features.weather.domain

import com.eazyapp.dashboard.features.weather.data.WeatherRepository
import javax.inject.Inject

class GetWeatherUseCase @Inject constructor(
    private val repository: WeatherRepository
) {
    suspend operator fun invoke(): Result<CurrentWeather> {
        return repository.getWeatherData()
    }
}
