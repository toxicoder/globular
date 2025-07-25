package com.eazyapp.dashboard.core.model

enum class WidgetStatus {
    NORMAL,
    WARNING,
    ERROR,
    LOADING
}

sealed class WidgetData(
    open val title: String,
    open val status: WidgetStatus = WidgetStatus.LOADING
) {
    data class Summary(
        override val title: String,
        val value: String,
        val unit: String,
        override val status: WidgetStatus = WidgetStatus.NORMAL
    ) : WidgetData(title, status)

    data class Graph(
        override val title: String,
        val points: List<Float>,
        override val status: WidgetStatus = WidgetStatus.NORMAL
    ) : WidgetData(title, status)
}
