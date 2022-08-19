// Initialize the map and set the view

// var map = L.map('map').setView([51.505, -0.09], 13);

// Add OSM

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);

// Maps.stamen.com

var layer = new L.StamenTileLayer("toner");
var map = new L.Map("map", {
    center: new L.LatLng(52.18, 5.32),
    zoom: 8
});
map.addLayer(layer);

// Styling for points

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#00F",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

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
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(map);
}

addGeoJson();