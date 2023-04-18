import React, {ChangeEvent, useState} from 'react';
import Button from "../Button";
import Chart from "./Chart";
import styles from "./Charts.module.css"

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


const ChartContainer = () => {

    const[chartType, setChartType] = useState<string>("Line")
    // Define source data
    let minDt: formatMinMaxDtType = new Date(2022, 1, 1)
    let maxDt: formatMinMaxDtType = null

    let chartTypes = ["Line", "Column", "Dot"]

    let data = JSON.parse(dataJson)


    const onClickButtonHandler = (value: string) => {
        /* value === "1x" && heightChart === "100vh"*/
    }

    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setChartType(e.target.value)
    }

    return (
        <div className={styles.chartContainer}>
            <div>
                {chartType === "Line" && <Chart id={"chartLine"} chartType={chartType} data={data} minDt={minDt} maxDt={maxDt}/>}
                {chartType === "Column" && <Chart id={"chartColumn"} chartType={chartType} data={data} minDt={minDt} maxDt={maxDt}/>}
                {chartType === "Dot" && <Chart id={"chartDot"} chartType={chartType} data={data} minDt={minDt} maxDt={maxDt}/>}
            </div>
            <div>
                <Button value={"1x"} onClick={onClickButtonHandler}/>
                <Button value={"0.5x"} onClick={onClickButtonHandler}/>
                <Button value={"0.25x"} onClick={onClickButtonHandler}/>
            </div>
            <div>
                <select onChange={onChangeSelectHandler}>
                    {chartTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
        </div>
    )
}

export default ChartContainer;

//types

type formatMinMaxDtType = null | Date
type dataMetrictsType = {
    metricts: dataMetricType[]
}
type dataMetricType = {
    dt: string
    value: number
}
type chartType = "Line" | "Column" | "Dot"




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

