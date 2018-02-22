/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
$(document).ready(function() {
  // Modify labels
  $("#text-label1").text('Data URL');
  $("#text-label2").text('Latitude Key');
  $("#text-label3").text('Longitude Key');
  $("#plot-button").text('Finish');

  // Tell user what to enter
  $("#text-input1").val('Enter URL Path');
  $("#text-input2").val('Enter Latitude Key');
  $("#text-input3").val('Enter Longitude Key');

  // Allow user input1
  $("#text-input1").prop('disabled', false);
  $("#text-input2").prop('disabled', false);
  $("#text-input3").prop('disabled', false);

  // Prevent error before user enter anything
  var url;
  var lat;
  var lon;

  // Get user input
  var getInput = function(){
    url = $("#text-input1").val();
    lat = $("#text-input2").val();
    lon = $("#text-input3").val();
  };

  // All functions for creating and removing markers
  var parseData = function(data) {
    return JSON.parse(data);
  };

  var makeMarkers = function(data) {
    return _.map(data, function(item){return L.marker([item[lat], item[lon]]);});
  };

  var plotMarkers = function(markers) {
    return _.map(markers, function(item){return item.addTo(map);});
  };

  /* =====================
   BUTTON CLICK RESULT
  ===================== */

  var plotIt = function(){
    // Call function to get all user input
    getInput();
    // Get data from user input
    var downloadData = $.ajax(url);
    // Plot markers using functions
    downloadData.done(function(data) {
      var parsed = parseData(data);
      var markers = makeMarkers(parsed);
      plotMarkers(markers);
    });
  };

  $("#plot-button").click(function() {
    plotIt();
  });

  /* =====================
   Leaflet setup - feel free to ignore this
  ===================== */

  var map = L.map('map', {
    center: [39.997462, -75.153902],
    zoom: 11
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

});
