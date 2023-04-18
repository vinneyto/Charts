import React, {useEffect, useRef} from 'react';
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {
    addCursor,
    createDateAxis,
    createMainPanel,
    createStockChart,
    createValueAxis
} from "../utils/createChartFunction";
import {createValueSeries} from "../utils/createValueSeries";
import {createToolbar} from "../utils/createToolbar";
import {createRangeSeries} from "../utils/createRangeSeries";
import styles from "./Charts.module.css"

const Chart = ({chartType, id, data, minDt, maxDt}: LineChartPropsType) => {

    let chartRoot = useRef<any>(null)
    let chartControlsRoot = useRef<any>(null)

    useEffect(() => {
            if (!chartRoot.current) {
                chartRoot.current = am5.Root.new(id)
                chartRoot.current.data = data.metricts
                chartRoot.current.setThemes([am5themes_Animated.new(chartRoot.current)])

                // Create stock chart
                let stockChart = createStockChart(chartRoot.current)
                let mainPanel = createMainPanel(chartRoot.current, stockChart)

                // Create Y-axis and X-axis
                let valueAxis = createValueAxis(chartRoot.current, mainPanel)
                let dateAxis = createDateAxis(chartRoot.current, mainPanel, minDt, maxDt)

                // Create valueSeries
                let valueSeries = createValueSeries(chartType, chartRoot.current, mainPanel, dateAxis, valueAxis, data)
                stockChart.set("stockSeries", valueSeries)

                // Create Range series
                createRangeSeries(valueSeries, valueAxis, chartType)

                //Add Cursor
                addCursor(mainPanel, chartRoot.current, dateAxis, valueAxis, valueSeries)

                // Add ToolBar
                createToolbar(chartRoot.current, chartControlsRoot.current, stockChart, minDt, maxDt)

                return () => {
                    chartRoot.current && chartRoot.current.dispose();
                }
            }
        }, []
    )
    return (
        <div className={styles.chart}>
            <div ref={chartControlsRoot}></div>
            <div id={id} style={{width: "100%", height: "70vh"}}></div>
        </div>

    );
};

export default Chart

// types
type LineChartPropsType = {
    chartType: any
    id: string
    data: any
    minDt: any
    maxDt: any
}