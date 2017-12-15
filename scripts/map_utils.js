function initMap() {
  map = new L.Map('map');

  var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
   maxZoom: 18,
   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
  map.setView(new L.LatLng(37.562296, 126.994345), 11);
  map.addLayer(OpenStreetMap_BlackAndWhite);
}

function getColor(d) {
  if (map_selectedInfo.type === 'CCTV 설치대 수') {
    return d > 400 ? '#800026' :
        d > 300  ? '#BD0026' :
        d > 200  ? '#E31A1C' :
        d > 120  ? '#FC4E2A' :
        d > 70   ? '#FD8D3C' :
        d > 50   ? '#FEB24C' :
        d > 30   ? '#FED976' :
                   '#FFEDA0';
  } else if (map_selectedInfo.type === '여성안심지킴이 집') {
    return d > 80 ? '#800026' :
        d > 65  ? '#BD0026' :
        d > 52  ? '#E31A1C' :
        d > 40  ? '#FC4E2A' :
        d > 30   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
                   '#FFEDA0';
  } else if (map_selectedInfo.type === '안심귀가스카우트 이용자 수') {
    return d > 20000 ? '#800026' :
        d > 15000  ? '#BD0026' :
        d > 10000  ? '#E31A1C' :
        d > 5000  ? '#FC4E2A' :
        d > 1000   ? '#FD8D3C' :
        d > 500   ? '#FEB24C' :
        d > 100   ? '#FED976' :
                   '#FFEDA0';
  } else if (map_selectedInfo.type === '구별 성범죄 수') {
    return d > 1000 ? '#800026' :
        d > 700  ? '#BD0026' :
        d > 500  ? '#E31A1C' :
        d > 400  ? '#FC4E2A' :
        d > 300   ? '#FD8D3C' :
        d > 200   ? '#FEB24C' :
        d > 100   ? '#FED976' :
                   '#FFEDA0';
  }
}

function style(feature) {
  var p;
  if (map_selectedInfo.type === 'CCTV 설치대 수') {
    p = feature.properties.cctv
  } else if (map_selectedInfo.type === '여성안심지킴이 집') {
    p = feature.properties.shelter
  } else if (map_selectedInfo.type === '안심귀가스카우트 이용자 수') {
    p = feature.properties.users
  } else if (map_selectedInfo.type === '구별 성범죄 수') {
    p = feature.properties.crime
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
    map_selectedInfo.year = year
    document.getElementById('year_drop').innerHTML = year
  }
  if (type) {
    map_selectedInfo.type = type
    document.getElementById('choice_drop').innerHTML = type
  }

  let data = statesData[map_selectedInfo.year];

  geojson.clearLayers()
  geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  legend.remove();
  legend.addTo(map);
}
