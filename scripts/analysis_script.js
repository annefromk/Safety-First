
      // Load Charts and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      google.charts.setOnLoadCallback(drawPieChart1);
      google.charts.setOnLoadCallback(drawLineYear);
      google.charts.setOnLoadCallback(drawLineWeek);
      google.charts.setOnLoadCallback(drawLineTime);


      function drawPieChart1() {
        var data = google.visualization.arrayToDataTable([
          ['범죄유형', '평균 발생 건수'],
          ['강간 및 강제추행', 5650], ['카메라 등 이용촬영', 2749],
          ['통신매체 이용 음란', 260], ['성적목적 공공장소 침입', 121]
          ]);

        var options = {
         title:'서울시 성범죄 유형별 발생률 (2014년-2016년)'
       };

       var chart = new google.visualization.PieChart(document.getElementById('pieChart1'));
       chart.draw(data, options);
     }

      //연도별 성범죄 발생 건수 그래프
      function drawLineYear() {
        var data = google.visualization.arrayToDataTable
        ([['연도', '발생건수'],
         ['2014년',  8523],
         ['2015년',  9476],
         ['2016년',  8342]
         ]);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
         { calc: "stringify",
         sourceColumn: 1,
         type: "string",
         role: "annotation" },
         ]);

        var options = {
          title : '서울시 연도별 성범죄 발생 건수 (2014년-2016년)',
          hAxis: {
            textStyle: {
              color: 'black',
              fontSize: 11,
            //fontName: 'Arial',
            bold: false,
            italic: false
          },
        },
        vAxis: {
          title: '발생 건수', minValue: 0, maxValue: 10000, gridlines: { count: 6 },
          textStyle: {
            color: 'black',
            fontSize: 11,
            bold: false
          },
          titleTextStyle: {
            color: 'black',
            fontSize: 11,
            bold: false
          }
        },
        legend: 'none',
        lineWidth: 2,
        colors: ['#a52714'],
        pointSize: 8,
        pointShape: 'square',
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.getElementById('line_year'));
      chart.draw(view, options);
    }


 //요일별 성범죄 발생 건수 그래프
 function drawLineWeek() {
  var data = google.visualization.arrayToDataTable([
   ['요일',  '평균'],
   ['월요일', 1163],
   ['화요일', 1300],
   ['수요일', 1220],
   ['목요일', 1264],
   ['금요일', 1376],
   ['토요일', 1322],
   ['일요일', 1136]
   ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
   { calc: "stringify",
   sourceColumn: 1,
   type: "string",
   role: "annotation" },
   ]);

  var options = {
    title : '서울시 요일별 성범죄 발생 건수 (2014년-2016년)',
    width:800,
    height:300,
    hAxis: {
      textStyle: {
        color: 'black',
        fontSize: 11,
            //fontName: 'Arial',
            bold: false,
            italic: false
          },
        },
        vAxis: {
          title: '평균 발생 건수', minValue: 0, maxValue: 1600, gridlines: { count: 4 },
          textStyle: {
            color: 'black',
            fontSize: 11,
            bold: false
          },
          titleTextStyle: {
            color: 'black',
            fontSize: 11,
            bold: false
          }
        },
        legend: 'none',
        lineWidth: 2,
        colors: ['#a52714'],
        pointSize: 8,
        pointShape: 'square',
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.getElementById('line_week'));
      chart.draw(view, options);
    }


//시간별 성범죄 발생 건수 그래프
function drawLineTime() {
  var data = google.visualization.arrayToDataTable([
   ['발생시간',           '평균'],
   ['심야(00:00~04:00)',   581],
   ['새벽(04:00~07:00)',   220],
   ['오전(07:00~12:00)',   309],
   ['오후(12:00~18:00)',   265],
   ['초저녁(18:00~20:00)', 454],
   ['밤(20:00~24:00)',     439]
   ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
   { calc: "stringify",
   sourceColumn: 1,
   type: "string",
   role: "annotation" },
   ]);

  var options = {
    title : '서울시 시간대별 성범죄 발생 건수 (2014년-2016년)',
    width:800,
    height:300,
    hAxis: {
      textStyle: {
        color: 'black',
        fontSize: 11,
            //fontName: 'Arial',
            bold: false,
            italic: false
          },
        },
        vAxis: {
          title: '시간당 평균 발생 건수', minValue: 0, maxValue: 600, gridlines: { count: 4 },
          textStyle: {
            color: 'black',
            fontSize: 11,
            bold: false
          },
          titleTextStyle: {
            color: 'black',
            fontSize: 11,
            bold: false
          }
        },
        legend: 'none',
        lineWidth: 2,
        colors: ['#a52714'],
        pointSize: 8,
        pointShape: 'square',
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.getElementById('line_time'));
      chart.draw(view, options);
    }
