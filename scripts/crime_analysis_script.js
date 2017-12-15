google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawBarChart);

function drawBarChart() {
  var data = google.visualization.arrayToDataTable([
   ['Year', '2014년', '2015년', '2016년'],
      ['강남',   754,  1152,  789],
      ['마포',   415,   673,  681],
      ['서초',   442,   578,  600],
      ['동작',   427,   497,   423],
      ['영등포',   348,   489,   475],
      ['서대문',  868,   212,    225],
      ['구로',   402,   497,   402],
      ['관악',   460,   403,   400],
      ['중구',   390,   438,   343],
      ['광진',   323,   362,   400],
      ['송파',   380,   390,   309],
      ['종로',   301,   404,   303],
      ['강서',   307,   349,   346],
      ['용산',   262,   252,   310],
      ['노원',   294,   318,   210],
      ['양천',   244,   329,   183],
      ['은평',   224,   291,   235],
      ['중랑',   207,   331,   195],
      ['성북',   224,   264,   213],
      ['금천',   246,   201,   233],
      ['강북',   217,   205,   253],
      ['동대문',   210,   225,   240],
      ['성동',   193,   253,   198],
      ['강동',   178,   207,   194],
      ['도봉',   207,   156,   182]
    ]);

var options = {
  title: '서울시 구별 성범죄 발생 건수',
    textStyle: {
      color: 'black',
      fontSize: 18,
      fontName: 'Noto Sans KR',
    },
  hAxis: {
    textStyle: {
      color: 'black',
      fontSize: 15,
      fontName: 'Noto Sans KR',
    bold: false,
    italic: false
   },
  },
vAxis: {title: '발생 건수', minValue: 0, maxValue: 1000, gridlines: { count: 5 }},
seriesType: 'bars',
};

var chart = new google.visualization.ComboChart(document.getElementById('barChart'));
chart.draw(data, options);
}
