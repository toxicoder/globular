package com.eazyapp.dashboard.ui.dashboard

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.eazyapp.dashboard.core.model.WidgetData

@Composable
fun GenericWidgetCard(widgetData: WidgetData) {
    Card(modifier = Modifier.padding(8.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            when (widgetData) {
                is WidgetData.Summary -> {
                    Text(text = widgetData.title)
                    Text(text = widgetData.value)
                    Text(text = widgetData.unit)
                }
                is WidgetData.Graph -> {
                    // Implement graph view later
                }
            }
        }
    }
}
