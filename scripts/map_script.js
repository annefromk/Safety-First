const map_selectedInfo = {year: '2014', type: 'CCTV 설치대 수'}

/////////////////////////////////////////////////////
// Initialize map
initMap();

/////////////////////////////////////////////////////
// Add info
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  if (props) {
    if (map_selectedInfo.type === 'CCTV 설치대 수') {
      this._div.innerHTML = `<h4>Number of ${ map_selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b> ${ props.cctv }대`
    } else if (map_selectedInfo.type === '여성안심지킴이 집') {
      this._div.innerHTML = `<h4>Number of ${ map_selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b> ${ props.shelter }곳`
    } else if (map_selectedInfo.type === '안심귀가스카우트 이용자 수') {
    this._div.innerHTML = `<h4>Number of ${ map_selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b> ${ props.users }명`
    } else if (map_selectedInfo.type === '구별 성범죄 수') {
    this._div.innerHTML = `<h4>Number of ${ map_selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b> ${ props.crime }건`
    }
  } else {
    this._div.innerHTML = `<h4>Number of ${ map_selectedInfo.type }</h4>Hover over a state`
  }
}

info.addTo(map);

/////////////////////////////////////////////////////
// Add geojson
var geojson = L.geoJson()

/////////////////////////////////////////////////////
// Add legnd
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  console.log(map_selectedInfo);
if (map_selectedInfo.type === 'CCTV 설치대 수'){
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 30, 50, 70, 120, 200, 300, 400],
    labels = [],
    from, to;
} else if (map_selectedInfo.type === '여성안심지킴이 집') {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 10, 20, 30, 40, 52, 65, 80],
    labels = [],
    from, to;
} else if (map_selectedInfo.type === '안심귀가스카우트 이용자 수') {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 100, 500, 1000, 5000, 10000, 15000, 20000],
    labels = [],
    from, to;
} else if (map_selectedInfo.type === '구별 성범죄 수') {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 100, 200, 300, 400, 500, 700, 1000],
    labels = [],
    from, to;
}


  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }

  div.innerHTML = labels.join('<br>');
  return div;
};
legend.addTo(map);
