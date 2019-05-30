// Create a map object
const myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
}).addTo(myMap);

// Earthquakes over the past day

quakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

(async function(){
  // Link to GeoJSON
  const APILink = quakeData;
  // Grab data with D3
  // ...
  const data = await d3.json(APILink);
  console.log(data);
 
  const dataFeatures = data.features;

      // Add circles to map
dataFeatures.forEach(loc => {
    let color = "";
    if (loc.properties.mag > 5) {
        color = "black";
    }
    else if (loc.properties.mag > 3) {
        color = "purple";
    }
    else if (loc.properties.mag > 1) {
        color = "pink";
    }
    else {
        color = "yellow";
    }

    L.circle([loc.geometry.coordinates[1],loc.geometry.coordinates[0]], {
        fillOpacity: 1.00,
        color: "red",
        fillColor: color,
        // Adjust radius
        radius: loc.properties.mag * 20000
    }).bindPopup("<h1>" + loc.properties.type + "</h1> <hr> <h3>Magnitued: " + loc.properties.mag + "</h3>").addTo(myMap);
})



var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = ['Mag >5','Mag >3','Mag >1','Mag <1'];
    console.log(categories);
    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);

})()
