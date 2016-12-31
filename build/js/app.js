(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.appId = "A5383437E866985135271069E";

exports.apiKey= "AIzaSyB5kAyu-hiQfZ0OUH84w_RA6XsXNHxCJ54";

},{}],2:[function(require,module,exports){
var appId = require('./../.env').appId;
var apiKey = require('./../.env').apiKey;

var map;

function addMarkerToMap(lat, long, routeDir, route, address, map) {
  var contentString = "<h5>Location:" + address + "</h5><h5>Route:" + route + "</h5><h5>Direction:" + routeDir + "</h5>";
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  var myLatLng = new google.maps.LatLng(lat, long);
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

}

$(document).ready(function() {

  $("form#location").submit(function(event) {
    event.preventDefault();
    var address = $("input#address").val();
    var feet = parseInt($("input#feet").val());
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();

        var latLng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
          zoom: 14,
          center: latLng
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        $.get('https://developer.trimet.org/ws/V1/stops?showRoutes=true&ll=' + latitude + ',' + longitude + '&feet=' + feet + '&appID=' + appId).then(function(response) {
          var locations = response.getElementsByTagName("location");
          var routes = response.getElementsByTagName("route");
          for (var i = 0; i <= locations.length - 1; i++) {
            var lat = locations[i].getAttribute('lat');
            var long = locations[i].getAttribute('lng');
            var address = locations[i].getAttribute('desc');
            var routeDir = locations[i].getAttribute('dir');
            var route = routes[i].getAttribute('desc');
            addMarkerToMap(lat, long, routeDir, route, address, map);
          }
        });
      } else {
        console.log(status);
      }
    });
  });
});

},{"./../.env":1}]},{},[2]);
