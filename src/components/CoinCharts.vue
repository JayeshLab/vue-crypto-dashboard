<template>
    <div>
        <div class="chart-bar">
            <div class="d-inline-block">
                <button @click="toLineChart">Line Chart</button>
                <button @click="toCandleStickChart">Candlestick Chart</button>
            </div>
            <div class="d-inline-block float-right">
                <button @click="updateTimeInterval('1h')">1H</button>
                <button @click="updateTimeInterval('1d')">1D</button>
                <button @click="updateTimeInterval('1w')">1W</button>
                <button @click="updateTimeInterval('1M')">1M</button>
            </div>
        </div>
        <div class="chart-panel" ref="chartdiv" id="chartdiv">

        </div>
    </div>
</template>
<script>
  import 'amcharts3/amcharts/amcharts'
  // eslint-disable-next-line
  import 'amcharts3/amcharts/serial'
  // eslint-disable-next-line
  import 'amstock3/amcharts/amstock'
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  export default {
    props:['symbol'],
    data() {
      return {
        chartData: [],
        chart: null,
        interval: '1d'
      }
    },
    mounted() {
      this.fetchChartData();
    },
    beforeDestroy() {
        this.chart.clear();
        this.chart = null;
    },
    methods: {
      fetchChartData(isUpdate=false) {
        fetch(`${proxyUrl}https://api.binance.com/api/v1/klines?symbol=${this.symbol}&interval=${this.interval}`).then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            response.json().then(function(data) {
              this.chartData = data.map((val) => {
                return {
                  "date": new Date(val[0]),
                  "open": parseFloat(val[1]),
                  "high": parseFloat(val[2]),
                  "low": parseFloat(val[3]),
                  "close": parseFloat(val[4]),
                  "volume": parseFloat(val[5]),
                  "value": parseFloat(val[4])
                }
              })
              if(isUpdate) {
                this.chart.dataSets[0].dataProvider = this.chartData
                this.chart.validateData()
              }
              else {
                this.showChart();
              }

            }.bind(this));
          }.bind(this)
        ).catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      },
      updateTimeInterval(ti) {
        this.interval = ti
        this.fetchChartData(true)
      },
      toCandleStickChart(){
        const dataSet = this.chart.dataSets[0]
        const panel = this.chart.panels[0]
        dataSet.fieldMappings = []
        dataSet.fieldMappings.push({
          fromField: "close",
          toField: "close",
        });
        dataSet.fieldMappings.push({
          fromField: "open",
          toField: "open"
        });
        dataSet.fieldMappings.push({
          fromField: "high",
          toField: "high"
        });
        dataSet.fieldMappings.push({
          fromField: "low",
          toField: "low"
        });
        panel.stockGraphs[0] = {
          id: "g1",
          type: "candlestick",
          balloonText: "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b>",
          closeField: "close",
          fillColors: "#00a928",
          highField: "high",
          lineColor: "#00a928",
          lineAlpha: 1,
          lowField: "low",
          fillAlphas: 1,
          negativeFillColors: "#db4c3c",
          negativeLineColor: "#db4c3c",
          openField: "open",
          valueField: "close",
          proCandlesticks: false
        };
        panel.stockLegend.valueTextRegular = "[[close]] ";
        this.chart.validateNow()
      },
      toLineChart() {
        const dataSet = this.chart.dataSets[0]
        const panel = this.chart.panels[0]
        dataSet.fieldMappings = []
        dataSet.fieldMappings.push({
          fromField: "close",
          toField: "close",
        });
        var lineChart = {
          id: "g1",
          valueField: "close",
          lineThickness: 1,
          balloonText: "Close:<b>[[close]]</b>"
        };
        panel.stockGraphs[0] = lineChart;
        panel.stockLegend.valueTextRegular = "[[close]] ";
        this.chart.validateNow()
      },
      showChart() {
        this.chart = window.AmCharts.makeChart( "chartdiv", {
          "type": "stock",
          "theme": "light",
          "dataDateFormat": "YYYY-MM-DD HH",
          "mouseWheelZoomEnabled": true,
          "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
          "categoryAxesSettings": {
            "minPeriod": "hh"
          },
          "dataSets": [ {
            "fieldMappings": [ {
              "fromField": "open",
              "toField": "open"
            }, {
              "fromField": "close",
              "toField": "close"
            }, {
              "fromField": "high",
              "toField": "high"
            }, {
              "fromField": "low",
              "toField": "low"
            }, {
              "fromField": "volume",
              "toField": "volume"
            }, {
              "fromField": "value",
              "toField": "value"
            }],
            "color": "#7f8da9",
            "dataProvider": this.chartData,
            "title": this.symbol,
            "categoryField": "date"
          } ],
          "panels": [
            {
            "title": "Price",
            "showCategoryAxis": true,
            "percentHeight": 70,
            "valueAxes": [ {
              "id": "v1",
              "dashLength": 5
            } ],

            "categoryAxis": {
              "dashLength": 5
            },

            "stockGraphs": [ {
              "type": "candlestick",
              "id": "g1",
              "openField": "open",
              "closeField": "close",
              "highField": "high",
              "lowField": "low",
              "valueField": "close",
              "lineColor": "#00a928",
              "fillColors": "#00a928",
              "negativeLineColor": "#db4c3c",
              "negativeFillColors": "#db4c3c",
              "fillAlphas": 1,
              "useDataSetColors": false,
              "showBalloon": true,
              "useNegativeColorIfDown": false,
              "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b>",
            } ],

            "stockLegend": {
              "valueTextRegular": undefined,
              "periodValueTextComparing": "[[percents.value.close]]%"
            }
          },
            {
              "title": "Volume",
              "percentHeight": 30,
              "marginTop": 1,
              "showCategoryAxis": true,
              "valueAxes": [ {
                "dashLength": 5
              } ],

              "categoryAxis": {
                "dashLength": 5
              },

              "stockGraphs": [ {
                "valueField": "volume",
                "type": "column",
                "showBalloon": true,
                "fillAlphas": 1
              } ],

              "stockLegend": {
                "markerType": "none",
                "markerSize": 0,
                "labelText": "",
                "periodValueTextRegular": "[[value.close]]"
              }
            }
          ],
          "chartScrollbarSettings": {
            "graph": "g1",
            "graphType": "line",
            "usePeriod": "DD"
          },
          "chartCursorSettings": {
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true
          },
          "legendSettings": {
            "useMarkerColorForLabels":true
          }
        } );
      }
    }
  }
</script>
<style lang="scss">
.chart-panel{
    height: 600px;
    width:100%;
}
    .chart-bar {
        height: 40px;
    }
</style>