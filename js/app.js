// Initialize the map and set the view

var map = L.map('map').setView([52.18, 5.32], 7);

// Add OSM

L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=3fa7344330944395b8886eac9e3f214a', {
    maxZoom: 19,
    attribution: '<a href="https://github.com/sammeltassen/mapping-quist">Source repository</a> | Basemap: © OpenStreetMap'
}).addTo(map);

// Maps.stamen.com

// var layer = new L.StamenTileLayer("toner");
// var map = new L.Map("map", {
//     center: new L.LatLng(52.18, 5.32),
//     zoom: 7
// });
// map.addLayer(layer);

// Marker styling

// var geojsonMarkerOptions = {
//     radius: 8,
//     fillColor: "#00F",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0
// };

// Popup contents

function onEachFeature(feature, layer) {
    // Does this feature have a property named Naam?
    if (feature.properties && feature.properties.Naam) {
        layer.bindPopup('<b>' + feature.properties.Naam + '</b><br>' + feature.properties.Periode);
    }
}

// Add geojson layer

async function addGeoJson() {
    // Load geojson from other file
    const response = await fetch("/mapping-quist/buildings.geojson");
    const data = await response.json();
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng);
        },
        onEachFeature: onEachFeature
    }).addTo(map);
}

addGeoJson();