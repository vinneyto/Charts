import * as am5stock from "@amcharts/amcharts5/stock";

// @ts-ignore
export const createToolbar = (root, container, stockChart, minDt, maxDt) => {
    am5stock.StockToolbar.new(root, {
        container: container,
        stockChart: stockChart,
        controls: [
            am5stock.DateRangeSelector.new(root, {
                stockChart: stockChart,
                minDate: minDt,
                maxDate: maxDt
            }),
            am5stock.PeriodSelector.new(root, {stockChart: stockChart}),
            am5stock.ResetControl.new(root, {stockChart: stockChart}),
            am5stock.SettingsControl.new(root, {stockChart: stockChart})
        ]
    })
}