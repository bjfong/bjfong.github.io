function initmapMagiq() {

	var centerLat = 34.0532786;
	var centerLong = -118.3836295;
	var zoomFactor = 14; // how close or far to zoom into map 

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
			lat: 34.0550,
			long: -118.38405
 		}
 	];

	initMap(places, centerLat, centerLong, zoomFactor);
}

function initmapSnowValley() {
	var centerLat = 34.134794;
	var centerLong = -117.412536;
	var zoomFactor = 9; // how close or far to zoom into map 

	var places = [
		{
			info: '<font color="black"><strong>Snow Valley Mountain Resort</strong><br>\
					35100 CA-18<br>Running Springs, CA 92382</font><br>\
					<a href="https://www.google.com/maps/dir//35100+CA-18+Running+Springs+CA+92382" target="_blank">Get Directions</a>',
			lat: 34.2249,
			long: -117.0356
		}, 
		{
			info: '<font color="black"><strong>Our Airbnb</strong><br>\
					30789 Knollview Dr<br>Skyforest, CA 92385</font><br>\
					<a href="https://www.google.com/maps/dir//30789+Knollview+Dr+Skyforest+CA+92385" target="_blank">Get Directions</a>',
			lat: 34.208625,
			long: -117.133313
		}, 
		{
			info: '<font color="black"><strong>Blauer Ski & Board</strong><br>\
					32170 Hilltop Blvd<br>Running Springs, CA 92382</font><br>\
					<a href="https://www.google.com/maps/dir//32170+Hilltop+Blvd+Running+Springs+CA+92382" target="_blank">Get Directions</a>',
			lat: 34.2048,
			long: -117.1014
		}, 
		{
			info: '<font color="black"><strong>Red Castle 3</strong><br>\
					18311 Colima Rd<br>Rowland Heights, CA 91748</font><br>\
					<a href="https://www.google.com/maps/dir//18311+Colima+Rd+Rowland+Heights+CA+91748" target="_blank">Get Directions</a>',
			lat: 33.9896,
			long: -117.9048
		}
	];

	initMap(places, centerLat, centerLong, zoomFactor);
}

function initmapOCSD() {
	var centerLat = 33.305285;
	var centerLong = -117.473493;
	var zoomFactor = 8; // how close or far to zoom into map 

	var places = [
		{
			info: '<font color="black"><strong>Shannon\'s House</strong><br>\
					Orange, CA 92867</font><br>\
					<a href="https://www.google.com/maps/dir//Orange+CA+92867" target="_blank">Get Directions</a>',
			lat: 33.8149351,
			long: -117.8806366
		},
		{
			// Emily's Place
		},
		{
			// Tipsy Crow
		},
		{
			// Whiskey Girl 
		}
	];


	initMap(places, centerLat, centerLong, zoomFactor);
}

// ---------------------------------------------------------------------------------

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