var map = L.map('map', {
    center: [55.3673, 10.4308],
    zoom: 17  // from 1 to 18
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmhlbHQxNSIsImEiOiJjam1peG0zYXUwOTRqM3dxcTRvMGF3aXpmIn0.4tE0Z9AzPQxGlr9mRsoQiQ'
}).addTo(map);

map.addEventListener('click', function(e) {
   alert(e.latlng.lat + ' - ' + e.latlng.lng);
});

map.addEventListener('mousemove', function(e) {
    document.getElementById('lat').innerHTML = e.latlng.lat;
    document.getElementById('lon').innerHTML = e.latlng.lng;
 });

let marker;


function draw(coords) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = drawCircle(coords, 'red', 5, 5, 1);
    map.fitBounds(marker.getBounds());
}

function drawCircle(coords, color, radius, weight, opacity) {
    let circle = L.circle(coords, {
        color: color, 
        radius: radius, 
        weight: weight, 
        opacity: opacity
    });
    circle.addTo(map);
    return circle;
}
