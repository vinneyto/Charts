import * as am5 from "@amcharts/amcharts5";

// @ts-ignore
export const createRangeSeries = (valueSeries, valueAxis, name) => {
    let rangeDataItem = valueAxis.makeDataItem({
        value: 35,
        endValue: 100
    })
    let range = valueSeries.createAxisRange(rangeDataItem)

    rangeDataItem.get("grid").setAll({
        strokeOpacity: 1,
        visible: true,
        stroke: am5.color(0xff621f),
        strokeDasharray: [2, 2]
    })

    if (name === "Line") {
        range.strokes.template.setAll({
            stroke: am5.color(0xff621f)
        })
    }
    if (name === "Column") {
        range.columns.template.setAll({
            fill: am5.color(0xff621f),
            stroke: am5.color(0xff621f)
        })
    }
    if (name === "Dot") {
        range.strokes.template.setAll({
            fill: am5.color(0xff621f),
            stroke: am5.color(0xff621f)
        })
    }
}

