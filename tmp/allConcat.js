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
