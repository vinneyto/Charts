import React, {useEffect, useRef} from 'react';
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5stock from "@amcharts/amcharts5/stock";
import * as am5xy from "@amcharts/amcharts5/xy";
import Button from "./Button";
import LineChart from "./LineChart";

type formatMinMaxDtType = null | Date
type dataMetrictsType = {
    metricts: dataMetricType[]
}
type dataMetricType = {
    dt: string
    value: number
}

const Chart = () => {

    // Define source data
    let minDt: formatMinMaxDtType = new Date(2022, 1, 1)
    let maxDt: formatMinMaxDtType = null

    let dataJson = `{
        "metricts": [
            {
                "dt": "2022-05-02T18:09:22.464Z",
                "value": 22.9
            },
            {
                "dt": "2022-06-02T18:09:22.464Z",
                "value": 39.0
            },
            {
                "dt": "2022-07-02T18:09:22.464Z",
                "value": 25.8
            },
            {
                "dt": "2022-08-02T18:09:22.464Z",
                "value": 33.3
            },
            {
                "dt": "2022-09-02T18:09:22.464Z",
                "value": 38.0
            },
            {
                "dt": "2022-09-02T18:09:22.464Z",
                "value": 45.0
            },
            {
                "dt": "2022-10-02T18:09:22.464Z",
                "value": 32.0
            },
            {
                "dt": "2022-10-08T18:09:22.464Z",
                "value": 32.0
            },
            {
                "dt": "2022-10-22T18:09:22.464Z",
                "value": 30.0
            },
            {
                "dt": "2022-11-02T18:09:22.464Z",
                "value": 30.0
            },
            {
                "dt": "2023-01-02T18:09:22.464Z",
                "value": 41.0
            },
            {
                "dt": "2023-02-02T18:09:22.464Z",
                "value": 38.0
            },
            {
                "dt": "2023-03-02T18:09:22.464Z",
                "value": 42.0
            },
            {
                "dt": "2023-04-02T18:09:22.464Z",
                "value": 43.3
            }
        ]
    }`
    let data = JSON.parse(dataJson)

    let chartRef = useRef<any>(null)
    let chartControlsRef = useRef<any>(null)


    useEffect(() => {
            if (!chartRef.current) {
                chartRef.current = am5.Root.new('chartdiv')
                chartRef.current.data = data.metricts
                chartRef.current.setThemes([am5themes_Animated.new(chartRef.current)])


                // Create a stock chart
                let stockChart = chartRef.current.container.children.push(
                    am5stock.StockChart.new(chartRef.current, {})
                )
                const stockChartSetting = {
                    stockChart: stockChart
                }
                let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(chartRef.current, {
                    wheelY: "zoomX",
                    panX: true,
                    panY: true,
                    height: am5.percent(50)
                }))
                // Create Y-axis
                const tooltip = am5.Tooltip.new(chartRef.current, {})

                let valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(chartRef.current, {
                    renderer: am5xy.AxisRendererY.new(chartRef.current, {pan: "zoom"}),
                    tooltip: tooltip,
                    extraTooltipPrecision: 1
                }))

                // Create X-axis
                const baseIntervalXAxis = {
                        timeUnit: "day",
                        count: 1
                    }

                let dateAxis = mainPanel.xAxes.push(am5xy.DateAxis.new(chartRef.current, {
                    baseInterval: baseIntervalXAxis,
                    groupData: true,
                    min: minDt?.getTime(),
                    max: maxDt?.getTime(),
                    renderer: am5xy.AxisRendererX.new(chartRef.current, {}),
                    tooltip: tooltip
                }))

                let series = (name: string, xAxis: any, yAxis: any) => {
                    return name === "Line"
                        ? am5xy.LineSeries.new(chartRef.current, {
                            name: name,
                            valueXField: "dt",
                            valueYField: "value",
                            xAxis: xAxis,
                            yAxis: yAxis
                        })
                        : am5xy.ColumnSeries.new(chartRef.current, {
                            name: name,
                            xAxis: xAxis,
                            yAxis: yAxis,
                            valueXField: "dt",
                            valueYField: "value",
                            tooltip: am5.Tooltip.new(chartRef.current, {}),
                            clustered: true
                        })
                }
                let valueSeries = mainPanel.series.push(series("Colunm", dateAxis, valueAxis))

                const dateFormat = {
                    dateFields: "dt",
                    dateFormat: "YYYY-MM-DDTHH:mm:ss.sssZ"
                }
                valueSeries.data.processor = am5.DataProcessor.new(chartRef.current, dateFormat)
                valueSeries.data.setAll(data.metricts)
                stockChart.set("stockSeries", valueSeries)


                // Add a stock legend
                let valueLegend = mainPanel.plotContainer.children.push(
                    am5stock.StockLegend.new(chartRef.current, stockChartSetting))
                valueLegend.data.setAll([valueSeries])
                // chart.series.values

                //Add Cursor
                mainPanel.set("cursor", am5xy.XYCursor.new(chartRef.current, {
                    yAxis: valueAxis,
                    xAxis: dateAxis,
                    snapToSeries: [valueSeries],
                    snapToSeriesBy: "y!"
                }))

                // Add ScrollBar
                let scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(chartRef.current, {
                    orientation: "horizontal",
                    height: 50
                }))
                stockChart.toolsContainer.children.push(scrollbar)

                let sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(chartRef.current, {
                    baseInterval: baseIntervalXAxis,
                    renderer: am5xy.AxisRendererX.new(chartRef.current, {})
                }))

                let sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(chartRef.current, {
                    renderer: am5xy.AxisRendererY.new(chartRef.current, {})
                }))

                let sbSeries = scrollbar.chart.series.push(series('Line', sbDateAxis, sbValueAxis))
                sbSeries.fills.template.setAll({
                    visible: true,
                    fillOpacity: 0.3
                })
                sbSeries.data.processor = am5.DataProcessor.new(chartRef.current, dateFormat)
                sbSeries.data.setAll(data.metricts)


                // add series range
               /* let seriesRangeDataItem = valueAxis.makeDataItem({value: 35, endValue: 100})
                let seriesRange = valueSeries.createAxisRange(seriesRangeDataItem);
                seriesRange.fills.template.setAll({
                    visible: true,
                    opacity: 0.3
                });

                seriesRange.fills.template.set("fill", am5.color(0xff621f));
                seriesRange.strokes.template.set("stroke", am5.color(0xff621f));

                seriesRangeDataItem.get("grid").setAll({
                    strokeOpacity: 1,
                    visible: true,
                    stroke: am5.color(0xff621f),
                    strokeDasharray: [2, 2]
                })*/

                /*seriesRangeDataItem.get("label").setAll({
                    location:0,
                    visible:true,
                    text:"Target",
                    inside:true,
                    centerX:0,
                    centerY:am5.p100,
                    fontWeight:"bold"
                })*/


                /*const createRange = (series:any, value: number, endValue: number, color:any) => {
                    let rangeDataItem = valueAxis.makeDataItem({
                        value: value,
                        endValue: endValue
                    })

                    let range = series.createAxisRange(rangeDataItem);

                    range.strokes.template.setAll({
                        stroke: color,
                        strokeWidth: 3
                    });

                    range.fills.template.setAll({
                        fill: color,
                        fillOpacity: 0.8,
                        visible: true
                    });

                    rangeDataItem.get("axisFill").setAll({
                        fill: color,
                        fillOpacity: 0.05,
                        visible: true
                    });

                }

                createRange(valueSeries, 0, 35, am5.color(0xff621f))*/

                // Add ToolBar
                let toolbar = am5stock.StockToolbar.new(chartRef.current, {
                    container: chartControlsRef.current,
                    ...stockChartSetting,
                    controls: [
                        am5stock.DateRangeSelector.new(chartRef.current, {
                            ...stockChartSetting,
                            minDate: minDt,
                            maxDate: maxDt
                        }),
                        am5stock.PeriodSelector.new(chartRef.current, stockChartSetting),
                        am5stock.ResetControl.new(chartRef.current, stockChartSetting),
                        am5stock.SettingsControl.new(chartRef.current, stockChartSetting)
                    ]
                })
                return () => {
                    chartRef.current && chartRef.current.dispose();
                }
            }
        }, []
    )

    let heightChart = "70vh"
    const onClickButtonHandler = (value: string) => {
        /* value === "1x" && heightChart === "100vh"*/
    }

    return (
        <div>
            <div>
                <div ref={chartControlsRef}></div>
                <LineChart id={"chartdiv"}/>
            </div>
            <div>
                <Button value={"1x"} onClick={onClickButtonHandler}/>
                <Button value={"0.5x"} onClick={onClickButtonHandler}/>
                <Button value={"0.25x"} onClick={onClickButtonHandler}/>
            </div>


        </div>
    )
}

export default Chart;


/*
Необходимо
разработать
модуль
по
работе
с
графиками:

    Входные
данные:
    -структура
с
метриками
в
формате
json


Выходные
данные:
    -изображение
графика

Требования
к
графикам:
    -должно
быть
удобное
АПИ
для
включения
в
другие
компоненты.Например
:

var jsonData = loadData(http
://0.0.0.0:1111/data.json)
var conf;
conf.minDt = '';
conf.maxDt = '';
conf.autoScaleDt = true;
conf.scaleFactor = 0.5;
conf.lineStyle = 'point|line|gistrogramma'
var chart = createChart(jsonData, conf);
chart.on("newDtState", function (mintDt, maxDt) {
}); // при изменении временной шкалы
chart.on("mouseClick", function (dt, value) {
}); // при клике на график. Выбор значения
chart.on("mouseValue", function (dt, value) {
}); // при наведении мышкой на график

...
chart.setData(newJsonData); // установить новые данные
...
chart.setValue(dt); // выставить текущее значение. Аналог mouseValue
chart.setClick(dt); // выставить текущее значение. Аналог mouseClick
*/

/*
- при движении мыши должен ползать ползунок показывающий текущее значение
- отображение значения параметра при наведении мыши на график
- поддержка шкалы времени - рисование на оси, рисование надписей без налезания
- Настройка отображения отображения графика:
    - в виде точек
- в виде гистограм
- в виде линий
- автомасштабирование по высоте с возможностью задания процента заполнения
(например, масштабировать до 100% высоты, до 50% высоты окна)
- выбор и масштабирование на выбранном промежутке мышью
- рисование линий граничных условий (горизонтальные линии, обозначающие коридоры)
- рисование графика за пределами граничных условий другим цветом
- корректная обработка пропущенных данных (там, где данные есть, соединять линиями, где отсутствуют, рисовать пропуск)
- подсветка различных интервалов графика (например, с 01:00 до 01:30 заливать зеленым, с 01:30 до 03:00 не заливать, с 03:00 до 03:45 заливать красным
- шкала времени

Дополнительные требования:

    - изменение масштаба времени
- интерполяция данных и рисование тренда
- прогнозирование (экстраполяция)
- связывание нескольких графиков с разнородными данными по времени. Синхрронная подсветка значений в указанный момент времени*/

