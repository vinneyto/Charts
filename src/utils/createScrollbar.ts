import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import {baseIntervalXAxis, createSeries, dateFormat} from "./createChartFunction.js";

// @ts-ignore
export const createScrollbarChart = (root, mainPanel, data, stockChart, name) => {
    let scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50
    }))
    stockChart.toolsContainer.children.push(scrollbar)

    let sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
        baseInterval: baseIntervalXAxis,
        renderer: am5xy.AxisRendererX.new(root, {})
    }))
    let sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }))
    let sbSeries = scrollbar.chart.series.push(createSeries(name, root, sbDateAxis, sbValueAxis))

    sbSeries.data.processor = am5.DataProcessor.new(root, dateFormat)
    sbSeries.data.setAll(data.metricts)
}
