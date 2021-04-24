jQuery(function () {
    jQuery("#line_chart").highcharts({
      chart: {
        type: "areaspline",
        marginBottom: "0",
        marginLeft: "0",
        marginRight: "0",
        marginTop: "0",
        plotBorderWidth: 0,
        plotShadow: false,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        spacingBottom: 0
      },
      title: {
        text: ""
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: "Value: <b>{point.y}</b>"
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      yAxis: {
        title: {
          enabled: false
        },
        min: 0,
        max: 36,
        gridLineWidth: 0
      },
      xAxis: {
        gridLineWidth: 0,
        categories: "",
        title: {
          enabled: false
        }
      },
      series: [
        {
          name: "Value",
          data: [12, 15, 11, 18, 12, 25, 21, 16, 15, 32, 22],
          color: "#6FB9CE",
          marker: {
            enabled: true,
            radius: 0
          },
          fillColor: {
            linearGradient: [0, 0, 0, 100],
            stops: [
              [0, "#BCD9EE"],
              [1, "white"]
            ]
          }
        }
      ]
    });
  
    //     jQuery('#column_chart').highcharts({
    //         chart: {
    //           type: 'column',
    //           marginBottom: '0',
    //           marginLeft: '0',
    //           marginRight: '0',
    //           marginTop: '0',
    //           plotBorderWidth: 0,
    // 	        plotShadow: false,
    //           spacingTop: 0,
    //           spacingLeft: 0,
    //           spacingRight: 0,
    //           spacingBottom: 0
    //         },
    //         title: {
    //             text: ''
    //         },
    //         legend: {
    //             enabled: false,
    //         },
    //         tooltip: {
    //             pointFormat: 'Value: <b>{point.y}</b>'
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         plotOptions: {
    //             areaspline: {
    //                 fillOpacity: 0.5
    //             }
    //         },
    //         yAxis: {
    //            title: {
    //              enabled: false
    //            },
    //           // min: 0, max:36,
    //           gridLineWidth: 0,
    //         },
    //         xAxis: {
    //           gridLineWidth: 0,
    //           categories: '',
    //            title: {
    //              enabled: false
    //            }
    //         },
    //         series: [{
    //             name: 'Value',
    //             data: [['M',12],['T',25],['W',21],['Th',16],['F',15],['S',32],['S',22]],
    //             color:'#6FB9CE',
    //           marker : {
    //                     enabled : true,
    //                     radius : 0
    //                 },
    //             },
  
    //         }]
    //     });
  });
  






  $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});




