/**
 * Dashboard Approver
 */

'use strict';

(function () {
  let cardColor, headingColor, labelColor, borderColor, legendColor;

  if (isDarkStyle) {
    cardColor = config.colors_dark.cardColor;
    headingColor = config.colors_dark.headingColor;
    labelColor = config.colors_dark.textMuted;
    legendColor = config.colors_dark.bodyColor;
    borderColor = config.colors_dark.borderColor;
  } else {
    cardColor = config.colors.cardColor;
    headingColor = config.colors.headingColor;
    labelColor = config.colors.textMuted;
    legendColor = config.colors.bodyColor;
    borderColor = config.colors.borderColor;
  }

  // Color constant
  const chartColors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    donut: {
      series1: '#fee802',
      series2: '#3fd0bd',
      series3: '#826bf8',
      series4: '#2b9bf4'
    },
    area: {
      series1: '#29dac7',
      series2: '#60f2ca',
      series3: '#a5f8cd'
    }
  };

  loadDataDiagram();

  // Radial Bar Chart
  // --------------------------------------------------------------------
  const radialBarChartEl = document.querySelector('#radialBarChart');
  const radialBarChartConfig = function (labels, series) {
    const total = series.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return {
      chart: {
        height: 380,
        type: 'radialBar'
      },
      colors: [chartColors.donut.series1, chartColors.donut.series2, chartColors.donut.series4],
      plotOptions: {
        radialBar: {
          size: 185,
          hollow: {
            size: '40%'
          },
          track: {
            margin: 10,
            background: config.colors_label.secondary
          },
          dataLabels: {
            name: {
              fontSize: '2rem',
              fontFamily: 'Public Sans'
            },
            value: {
              fontSize: '1.2rem',
              color: legendColor,
              fontFamily: 'Public Sans'
            },
            total: {
              show: true,
              fontWeight: 400,
              fontSize: '1.3rem',
              color: headingColor,
              label: labels[0],
              formatter: function (w) {
                return ((series[0] / total) * 100).toFixed(1) + '%';
              }
            }
          }
        }
      },
      grid: {
        borderColor: borderColor,
        padding: {
          top: -25,
          bottom: -20
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        labels: {
          colors: legendColor,
          useSeriesColors: false
        }
      },
      stroke: {
        lineCap: 'round'
      },
      series,
      labels
    };
  };

  // Donut Chart
  // --------------------------------------------------------------------
  const donutChartEl = document.querySelector('#donutChart');
  const donutChartConfig = function (labels, series) {
    const total = series.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return {
      chart: {
        height: 390,
        type: 'donut'
      },
      labels,
      series,
      colors: [chartColors.donut.series1, chartColors.donut.series4, chartColors.donut.series3, chartColors.donut.series2],
      stroke: {
        show: false,
        curve: 'straight'
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return val.toFixed(0) + '%';
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        markers: { offsetX: -3 },
        itemMargin: {
          vertical: 3,
          horizontal: 10
        },
        labels: {
          colors: legendColor,
          useSeriesColors: false
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: '2rem',
                fontFamily: 'Public Sans'
              },
              value: {
                fontSize: '1.2rem',
                color: legendColor,
                fontFamily: 'Public Sans',
                formatter: function (val) {
                  return ((val / total) * 100).toFixed(1) + '%';
                }
              },
              total: {
                show: true,
                fontSize: '1.5rem',
                color: headingColor,
                label: labels[0],
                formatter: function (w) {
                  return ((series[0] / total) * 100).toFixed(1) + '%';
                }
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 380
            },
            legend: {
              position: 'bottom',
              labels: {
                colors: legendColor,
                useSeriesColors: false
              }
            }
          }
        },
        {
          breakpoint: 576,
          options: {
            chart: {
              height: 320
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      fontSize: '1.5rem'
                    },
                    value: {
                      fontSize: '1rem'
                    },
                    total: {
                      fontSize: '1.5rem'
                    }
                  }
                }
              }
            },
            legend: {
              position: 'bottom',
              labels: {
                colors: legendColor,
                useSeriesColors: false
              }
            }
          }
        },
        {
          breakpoint: 420,
          options: {
            chart: {
              height: 280
            },
            legend: {
              show: false
            }
          }
        },
        {
          breakpoint: 360,
          options: {
            chart: {
              height: 250
            },
            legend: {
              show: false
            }
          }
        }
      ]
    };
  };

  function loadDataDiagram() {
    $.get('/api/dashboard-approver', function (data) {
      if (data.status) {
        $('.totalVehicles').html(data.totalVehicles);
        $('.totalDrivers').html(data.totalDrivers);
        $('.totalBookings').html(data.totalBookings);
        $('.totalAdmins').html(data.totalAdmins);

        if (typeof radialBarChartEl !== undefined && radialBarChartEl !== null) {
          const radialChart = new ApexCharts(radialBarChartEl, radialBarChartConfig(data.vehicleStatistics.labels, data.vehicleStatistics.series));
          radialChart.render();
        }

        if (typeof donutChartEl !== undefined && donutChartEl !== null) {
          const donutChart = new ApexCharts(donutChartEl, donutChartConfig(data.bookingRatio.labels, data.bookingRatio.series));
          donutChart.render();
        }
      }
    });
  }
})();
