const selectedInfo = {year: '2014', type: 'CCTV'}

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
    if (selectedInfo.type === 'CCTV') {
      this._div.innerHTML = `<h4>Number of CCTV</h4><b>${ props.SIG_KOR_NM }</b><br />${ props.CCTV }대`
    } else if (selectedInfo.type === '여성지킴이 집') {
      this._div.innerHTML = `<h4>Number of ${ selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b><br />${ props.Shelter }곳`
    } else if (selectedInfo.type === '여성지킴이 이용자 수') {
      // TODO
    }
  } else {
    this._div.innerHTML = `<h4>Number of ${ selectedInfo.type }</h4>Hover over a state`
  }
}

info.addTo(map);

/////////////////////////////////////////////////////
// Add geojson
var geojson = L.geoJson()
changeLayer('2014')

/////////////////////////////////////////////////////
// Add legnd
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 30, 50, 70, 120, 200, 300, 400],
    labels = [],
    from, to;

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
