package com.eazyapp.dashboard.ui.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.eazyapp.dashboard.core.model.WidgetData
import com.eazyapp.dashboard.core.model.WidgetStatus
import com.eazyapp.dashboard.features.weather.domain.GetWeatherUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class DashboardUiState(
    val widgets: List<WidgetData> = emptyList()
)

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val getWeatherUseCase: GetWeatherUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow(DashboardUiState())
    val uiState: StateFlow<DashboardUiState> = _uiState

    init {
        loadWeatherWidget()
    }

    private fun loadWeatherWidget() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(
                widgets = _uiState.value.widgets + WidgetData.Summary(
                    title = "Weather",
                    value = "",
                    unit = "",
                    status = WidgetStatus.LOADING
                )
            )
            getWeatherUseCase().onSuccess {
                val weatherWidget = WidgetData.Summary(
                    title = "Temperature",
                    value = it.temp.toString(),
                    unit = "°C"
                )
                _uiState.value = _uiState.value.copy(
                    widgets = _uiState.value.widgets.map {
                        if (it.title == "Weather") weatherWidget else it
                    }
                )
            }.onFailure {
                _uiState.value = _uiState.value.copy(
                    widgets = _uiState.value.widgets.map {
                        if (it.title == "Weather") it.copy(status = WidgetStatus.ERROR) else it
                    }
                )
            }
        }
    }
}
