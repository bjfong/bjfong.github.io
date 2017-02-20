function initmapMagiq() {

	var centerLat = 34.0532786;
	var centerLong = -118.3836295;
	var zoomFactor = 14; // how close or far to zoom into map 

	var places = [
 		{
			info: '<font color="black"><strong>MagIQ Room</strong><br>\
					1446 Robertson Blvd<br>Los Angeles, CA 90035</font><br>\
					<a href="https://goo.gl/3tsfEq" target="_blank">Get Directions</a>',
			lat: centerLat,
			long: centerLong
 		},
 		{
			info: '<font color="black"><strong>Komodo</strong><br>\
					8809 W Pico Blvd<br>Los Angeles, CA 90035</font><br>\
					<a href="https://goo.gl/wjSOim" target="_blank">Get Directions</a>',
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
					<a href="https://goo.gl/9APjGM" target="_blank">Get Directions</a>',
			lat: 34.2249,
			long: -117.0356
		}, 
		{
			info: '<font color="black"><strong>Our Airbnb</strong><br>\
					30789 Knollview Dr<br>Skyforest, CA 92385</font><br>\
					<a href="https://goo.gl/J8W1Dn" target="_blank">Get Directions</a>',
			lat: 34.208625,
			long: -117.133313
		}, 
		{
			info: '<font color="black"><strong>Blauer Ski & Board</strong><br>\
					32170 Hilltop Blvd<br>Running Springs, CA 92382</font><br>\
					<a href="https://goo.gl/EFwNtO" target="_blank">Get Directions</a>',
			lat: 34.2048,
			long: -117.1014
		}, 
		{
			info: '<font color="black"><strong>Red Castle 3</strong><br>\
					18311 Colima Rd<br>Rowland Heights, CA 91748</font><br>\
					<a href="https://goo.gl/gD9hLM" target="_blank">Get Directions</a>',
			lat: 33.9896,
			long: -117.9048
		}
	];

	initMap(places, centerLat, centerLong, zoomFactor);
}

function initmapOCSD() {
	var centerLat = 32.7135;
	var centerLong = -117.1603;
	var zoomFactor = 14; // how close or far to zoom into map 

	var places = [
		{
			info: '<font color="black"><strong>The Tipsy Crow</strong><br>\
					770 5th Ave<br>San Diego, CA 92101</font><br>\
					<a href="https://goo.gl/Rj1jLl" target="_blank">Get Directions</a>',
			lat: centerLat,
			long: centerLong
		},
		{
			info: '<font color="black"><strong>Whiskey Girl</strong><br>\
					702 5th Ave<br>San Diego, CA 92101</font><br>\
					<a href="https://goo.gl/QzMbTP" target="_blank">Get Directions</a>',
			lat: 32.7128,
			long: -117.1603
		}
	];

	initMap(places, centerLat, centerLong, zoomFactor);
}

function initmapTokyo() {
	var centerLat = 35.700;
	var centerLong = 139.7454;
	var zoomFactor = 12;// how close or far to zoom into map 

	var places = [
		{
			info: '<font color="black"><strong>Tokyo Tower</strong><br>\
					4 Chome-2-8 Shibakoen, Minato<br>Tōkyō 105-0011, Japan</font><br>\
					<a href="https://goo.gl/zKsrkG" target="_blank">Get Directions</a>',
			lat: 35.6586,
			long: 139.7454
		},
		{
			info: '<font color="black"><strong>Narita International Airport</strong><br>\
					1-1 Furugome, Narita-shi<br>Chiba-ken 282-0004, Japan</font><br>\
					<a href="https://goo.gl/33dmjz" target="_blank">Get Directions</a>',
			lat: 35.7719867,
			long: 140.3906561
		},
		{
			info: '<font color="black"><strong>Mt. Fuji</strong><br>\
					1-1 Furugome, Narita-shi<br>Chiba-ken 282-0004, Japan</font><br>\
					<a href="https://goo.gl/vWhb4A" target="_blank">Get Directions</a>',
			lat: 35.3605555,
			long: 138.7255837
		},
		{
			info: '<font color="black"><strong>Robot Restaurant</strong><br>\
					歌舞伎町1-7-1 新宿ロボットビル B2F<br>Shinjuku, 東京都 〒160-0013 Japan</font><br>\
					<a href="https://goo.gl/N7ds1k" target="_blank">Get Directions</a>',
			lat: 35.6943,
			long: 139.7028
		},
		{
			info: '<font color="black"><strong>Fukki</strong><br>\
					芝大門2-1-1<br>Minato, 東京都 〒105-0012 Japan</font><br>\
					<a href="https://goo.gl/blTVdK" target="_blank">Get Directions</a>',
			lat: 35.65683,
			long: 139.75299
		},
		{
			info: '<font color="black"><strong>Hamarikyuonshi Gardens</strong><br>\
					浜離宮庭園1-1<br>Chūō, 東京都 〒104-0046 Japan</font><br>\
					<a href="https://goo.gl/6ksGPV" target="_blank">Get Directions</a>',
			lat: 35.6597,
			long: 139.7635
		},
		{
			info: '<font color="black"><strong>Tsukiji Fish Market</strong><br>\
					5 Chome-2-1 Tsukiji<br>Chūō-ku, Tōkyō-to 104-0045, Japan</font><br>\
					<a href="https://goo.gl/mwpJAi" target="_blank">Get Directions</a>',
			lat: 35.6655,
			long: 139.7707
		},
		{
			info: '<font color="black"><strong>Genki Sushi Shibuya</strong><br>\
					宇田川町24-8 レジャープラザビル 1F<br>Shibuya, 東京都 〒150-0042 Japan</font><br>\
					<a href="https://goo.gl/xGSXUq" target="_blank">Get Directions</a>',
			lat: 35.6604,
			long: 139.6994
		},
		{
			info: '<font color="black"><strong>Hub British Pub</strong><br>\
					宇田川町22-2 渋谷西村総本店ビル 地下一階<br>Shibuya, 東京都 〒150-0042 Japan</font><br>\
					<a href="https://goo.gl/Aax82X" target="_blank">Get Directions</a>',
			lat: 35.6588,
			long: 139.6990
		},		
		{
			info: '<font color="black"><strong>Shibuya Crossing</strong><br>\
					道玄坂 渋谷駅ハチ公口前<br>Shibuya, 東京都 〒150-0043 Japan</font><br>\
					<a href="https://goo.gl/WoYDWM" target="_blank">Get Directions</a>',
			lat: 35.6618,
			long: 139.7041
		},			
		{
			info: '<font color="black"><strong>Hachiko Statue</strong><br>\
					道玄坂 渋谷駅ハチ公口前<br>Shibuya, 東京都 〒150-0043 Japan</font><br>\
					<a href="https://goo.gl/RAFhQn" target="_blank">Get Directions</a>',
			lat: 35.6591, 
			long: 139.7006
		},	
		{
			info: '<font color="black"><strong>Yoyogi Park</strong><br>\
					代々木神園町2-1<br>Shibuya, 東京都 〒150-0041 Japan</font><br>\
					<a href="https://goo.gl/2skdF1" target="_blank">Get Directions</a>',
			lat: 35.6717, 
			long: 139.6949
		},		
		{
			info: '<font color="black"><strong>Nadaifujisoba Sugamo</strong><br>\
					巣鴨1-13-4 第67東京ビル<br>Toshima, 東京都 〒170-0002 Japan</font><br>\
					<a href="https://goo.gl/6LuZbK" target="_blank">Get Directions</a>',
			lat: 35.7332543, 
			long: 139.739775
		},		
		{
			info: '<font color="black"><strong>Tsuta Ramen</strong><br>\
					巣鴨1-14-1 Plateau-Saka 1F<br>Toshima, 東京都 〒170-0002 Japan</font><br>\
					<a href="https://goo.gl/54nxsF" target="_blank">Get Directions</a>',
			lat: 35.7329, 
			long: 139.7406
		},
		{
			info: '<font color="black"><strong>Shinjuku Nakajima</strong><br>\
					新宿3-32-5 日原ビル Ｂ1Ｆ<br>Shinjuku, 東京都 〒100-0005 Japan</font><br>\
					<a href="https://goo.gl/jPjeUi" target="_blank">Get Directions</a>',
			lat: 35.6902, 
			long: 139.7039
		},	
		{
			info: '<font color="black"><strong>Yoshinoya Akihabara Chūōdōri</strong><br>\
					外神田1-11-8<br>Chiyoda, 東京都 〒101-0021 Japan</font><br>\
					<a href="https://goo.gl/jGZZlI" target="_blank">Get Directions</a>',
			lat: 35.699156, 
			long: 139.7703
		},	
		{
			info: '<font color="black"><strong>Ameya-Yokochō</strong><br>\
					上野4丁目<br>Taitō, 東京都 〒110-0005 Japan</font><br>\
					<a href="https://goo.gl/K5N6m5" target="_blank">Get Directions</a>',
			lat: 35.7114, 
			long: 139.7746
		}		
	];

	// yoyogi park, uenoyamacho, 

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