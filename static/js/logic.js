// Creating the map object
var myMap = L.map("map", {
    center: [45.0522, -100.2437],
    zoom: 4
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  var geojson;
  
  // Get the data with d3.
  d3.json(geoData).then(function(data) {
  
    console.log(data);
//creating function to create feature for creating the popup when selecting the earthquake
//create function for bubble colors depending on the magnatude of the earthquakes
  geojson = L.geoJson(data, {

    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(("<h2>" + feature.properties.title + '</h2> <br><h3>' + new Date(feature.properties.time) + "</h3>" + '<h4> Magnitude : ' +feature.properties.mag +'</h4>'))
    }
  }).addTo(myMap);



  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits =['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
    var colors = geojson.options.colors;
    var labels = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+']

    // Add the minimum and maximum.
    var legendInfo = "<h1>Earthquakes</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + labels + "</div>" +
        "<div class=\"max\">" + labels + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);



})