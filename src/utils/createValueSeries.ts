import * as am5 from "@amcharts/amcharts5";
import {createSeries, dateFormat} from "./createChartFunction.js";

// @ts-ignore
export const createValueSeries = (name, root, mainPanel, xAxis, yAxis, data) => {
    let valueSeries = mainPanel.series.push(createSeries(name, root, xAxis, yAxis))

    // Create Dot series
    if (name === "Dot") {
        valueSeries.strokes.template.set("visible", false)
        let circleTemplate: am5.Template<am5.Circle> = am5.Template.new({})
        valueSeries.bullets.push(function() {
            const bulletCircle = am5.Circle.new(root, {
                radius: 5,
                fill: valueSeries.get("fill"),
                fillOpacity: 0.8
            }, circleTemplate)

            return am5.Bullet.new(root, {
                sprite: bulletCircle
            })
        })
    }

    // Formatting date
    valueSeries.data.processor = am5.DataProcessor.new(root, dateFormat)
    // Set data to valueSeries
    valueSeries.data.setAll(data.metricts)

    return valueSeries
}