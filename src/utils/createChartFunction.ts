import * as am5stock from "@amcharts/amcharts5/stock";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

// @ts-ignore
export let createStockChart = (root) => {
    return root.container.children.push(
        am5stock.StockChart.new(root, {
            stockPositiveColor: am5.color(0x095256),
            stockNegativeColor: am5.color(0x095256)
        })
    )
}
// @ts-ignore
export let createMainPanel = (root, stockChart) => {
    return stockChart.panels.push(am5stock.StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true,
        height: am5.percent(70),
        layout: root.verticalLayout
    }))
}

// Setting
export const baseIntervalXAxis = {timeUnit: "day", count: 1}
export const dateFormat = {
    dateFields: "dt",
    dateFormat: "YYYY-MM-DDTHH:mm:ss.sssZ"
}
// @ts-ignore
const tooltip = (root) => {
    return am5.Tooltip.new(root, {})
}


// Create xAxis and yAxis
// @ts-ignore
export const createValueAxis = (root, mainPanel) => {
    return mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {pan: "zoom"}),
        tooltip: tooltip(root),
        extraTooltipPrecision: 1
    }))
}
// @ts-ignore
export const createDateAxis = (root, mainPanel, minDt, maxDt) => {
    return mainPanel.xAxes.push(am5xy.DateAxis.new(root, {
        baseInterval: baseIntervalXAxis,
        /*groupData: true,*/
        min: minDt?.getTime(),
        max: maxDt?.getTime(),
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: tooltip(root)
    }))
}

// Create Series
// @ts-ignore
export const createSeries = (name, root, xAxis, yAxis) => {
    if (name === "Line" || name === "Dot") return am5xy.LineSeries.new(root, {
        name: name,
        valueXField: "dt",
        valueYField: "value",
        xAxis: xAxis,
        yAxis: yAxis,
        legendLabelText: "Series: {name}",
        legendRangeLabelText: "Series: {name}",
        seriesTooltipTarget: "bullet"
    })
    if (name === "Column" ) {
        return  am5xy.ColumnSeries.new(root, {
            name: name,
            valueXField: "dt",
            valueYField: "value",
            xAxis: xAxis,
            yAxis: yAxis,
            tooltip: tooltip(root),
            legendLabelText: "Series: {name}",
            legendRangeLabelText: "Series: {name}"

        })
    }}

// Create ValueLegend
// @ts-ignore
export const createValueLegend = (mainPanel, root, stockChart) => {
    return mainPanel.plotContainer.children.push(
        am5stock.StockLegend.new(root, {stockChart: stockChart}))
}

// Add cursor
// @ts-ignore
export const addCursor = (mainPanel, root, xAxis, yAxis, valueSeries) => {
    mainPanel.set("cursor", am5xy.XYCursor.new(root, {
        yAxis: yAxis,
        xAxis: xAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: "y!"
    }))
}



// Add a stock legend
/*let valueLegend = createValueLegend(mainPanel, chartRoot.current, stockChart)
valueLegend.data.setAll([valueSeries])*/

// Add ScrollBar
/*createScrollbarChart(chartRoot.current, mainPanel, data, stockChart, chartType)*/


