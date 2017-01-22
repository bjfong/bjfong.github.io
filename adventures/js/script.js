function initmapMagiq() {

	var centerLat = 34.0532786;
	var centerLong = -118.3836295;
	var zoomFactor = 13; // how close or far to zoom into map 

	var places = [
 		{
			info: '<font color="black"><strong>MagIQ Room</strong><br>\
						1446 Robertson Blvd<br>Los Angeles, CA 90035</font><br>\
						<a href="https://www.google.com/maps/dir//1446+Robertson+Blvd+Los+Angeles+CA+90035" target="_blank">Get Directions</a>',
			lat: centerLat,
			long: centerLong
 		},
 		{
			info: '<font color="black"><strong>Komodo</strong><br>\
						8809 W Pico Blvd<br>Los Angeles, CA 90035</font><br>\
						<a href="https://www.google.com/maps/dir//8809+W+Pico+Blvd+Los+Angeles+CA+90035" target="_blank">Get Directions</a>',
			lat: 34.054992,
			long: -118.3862567
 		}
 	];

	initMap(places, centerLat, centerLong, zoomFactor);
}

/* main controller that shows locations on Google Maps */
function initMap(places, centerLat, centerLong, zoomFactor) {

 	var locations = [];
	for(var i = 0; i < places.length; i++) {
		locations.push([places[i].info, places[i].lat, places[i].long, i]);
	}

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: zoomFactor,
		center: new google.maps.LatLng(centerLat, centerLong),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for(i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	} 
}