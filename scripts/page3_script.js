function initMap() {
  map = new L.Map('map');

  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

  map.setView(new L.LatLng(37.562296, 126.994345), 11);
  map.addLayer(osm);
}

function getColor(d) {
  if (selectedInfo.type === 'CCTV 설치대 수') {
    return d > 400 ? '#800026' :
        d > 300  ? '#BD0026' :
        d > 200  ? '#E31A1C' :
        d > 120  ? '#FC4E2A' :
        d > 70   ? '#FD8D3C' :
        d > 50   ? '#FEB24C' :
        d > 30   ? '#FED976' :
                   '#FFEDA0';
  } else if (selectedInfo.type === '여성안심지킴이 집') {
    return d > 80 ? '#800026' :
        d > 65  ? '#BD0026' :
        d > 52  ? '#E31A1C' :
        d > 40  ? '#FC4E2A' :
        d > 30   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
                   '#FFEDA0';
  } else if (selectedInfo.type === '안심귀가스카우트 이용자 수') {
    return d > 20000 ? '#800026' :
        d > 15000  ? '#BD0026' :
        d > 10000  ? '#E31A1C' :
        d > 5000  ? '#FC4E2A' :
        d > 1000   ? '#FD8D3C' :
        d > 500   ? '#FEB24C' :
        d > 100   ? '#FED976' :
                   '#FFEDA0';
  }
}

function style(feature) {
  var p;
  if (selectedInfo.type === 'CCTV 설치대 수') {
    p = feature.properties.cctv
  } else if (selectedInfo.type === '여성안심지킴이 집') {
    p = feature.properties.shelter
  } else if (selectedInfo.type === '안심귀가스카우트 이용자 수') {
    p = feature.properties.users
      console.log(p);
  }
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColor(p)
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

const changeLayer = (year, type) => {
  if (year) {
    selectedInfo.year = year
    document.getElementById('year_drop').innerHTML = year
  }
  if (type) {
    selectedInfo.type = type
    document.getElementById('choice_drop').innerHTML = type
  }

  let data = statesData[selectedInfo.year];

  geojson.clearLayers()
  geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  legend.remove();
  legend.addTo(map);
}


const selectedInfo = {year: '2014', type: 'CCTV 설치대 수'}

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
    if (selectedInfo.type === 'CCTV 설치대 수') {
      this._div.innerHTML = `<h4>Number of ${ selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b> ${ props.cctv }대`
    } else if (selectedInfo.type === '여성안심지킴이 집') {
      this._div.innerHTML = `<h4>Number of ${ selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b> ${ props.shelter }곳`
    } else if (selectedInfo.type === '안심귀가스카우트 이용자 수') {
    this._div.innerHTML = `<h4>Number of ${ selectedInfo.type }</h4><b>${ props.SIG_KOR_NM }</b> ${ props.users }명`
    }
  } else {
    this._div.innerHTML = `<h4>Number of ${ selectedInfo.type }</h4>Hover over a state`
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
  console.log(selectedInfo);
if (selectedInfo.type === 'CCTV 설치대 수'){
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 30, 50, 70, 120, 200, 300, 400],
    labels = [],
    from, to;
} else if (selectedInfo.type === '여성안심지킴이 집') {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 10, 20, 30, 40, 52, 65, 80],
    labels = [],
    from, to;
} else if (selectedInfo.type === '안심귀가스카우트 이용자 수') {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 100, 500, 1000, 5000, 10000, 15000, 20000],
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