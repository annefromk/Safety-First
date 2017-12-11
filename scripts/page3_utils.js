function initMap() {
  map = new L.Map('map');

  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

  map.setView(new L.LatLng(37.562296, 126.994345), 11);
  map.addLayer(osm);
}

function getColor(d) {
  if (selectedInfo.type === 'CCTV') {
    return d > 400 ? '#800026' :
        d > 300  ? '#BD0026' :
        d > 200  ? '#E31A1C' :
        d > 120  ? '#FC4E2A' :
        d > 70   ? '#FD8D3C' :
        d > 50   ? '#FEB24C' :
        d > 30   ? '#FED976' :
                   '#FFEDA0';
  } else if (selectedInfo.type === '여성지킴이 집') {
    return d > 80 ? '#800026' :
        d > 65  ? '#BD0026' :
        d > 52  ? '#E31A1C' :
        d > 40  ? '#FC4E2A' :
        d > 30   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
                   '#FFEDA0';
  } else if (selectedInfo.type === '여성지킴이 이용자 수') {
    // TODO
  }
}

function style(feature) {
  let p
  if (selectedInfo.type === 'CCTV') {
    p = feature.properties.CCTV
  } else if (selectedInfo.type === '여성지킴이 집') {
    p = feature.properties.Shelter
  } else if (selectedInfo.type === '여성지킴이 이용자 수') {
    // TODO
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

  let data
  if (selectedInfo.year === '2014') {
    data = statesData_2014
  } else if (selectedInfo.year === '2015') {
    data = statesData_2015
  } else if (selectedInfo.year === '2016') {
    data = statesData_2016
  }

  geojson.clearLayers()
  geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
}