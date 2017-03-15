define('main',
	[
	'require',
	'leaflet/leaflet',
	'jquery/jquery-3.1.1.min',
	],
	function(require,leaflet) {
    // refer to RFC7946 for The GeoJSON Format
    // https://tools.ietf.org/html/rfc7946
	var init_lat = 37.97765252366751 , init_lon = 23.78303474471221 , init_zoom = 5;

    var map = L.map('map').setView([init_lon, init_lat], init_zoom);

    var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var mapboxurl = 'https://api.mapbox.com/styles/v1/aduitsis/cj0838v9n002k2sqpyabeut6q/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWR1aXRzaXMiLCJhIjoiY2owODJqdnFoMDRzaDMzcGVmeTNxNGJoMCJ9._b-ydVC6mADhaiwuEMjW4A';

    L.tileLayer(mapboxurl, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 23,
        //    id: 'your.mapbox.project.id',
        //    accessToken: 'pk.eyJ1IjoiYWR1aXRzaXMiLCJhIjoiY2owODJqdnFoMDRzaDMzcGVmeTNxNGJoMCJ9._b-ydVC6mADhaiwuEMjW4A'
    }).addTo(map);


	jQuery.ajax({
		url: 'ntua.json',
		dataType: 'json'}
	).then(
		function(data,testStatus,jqXHR) {
			var min_lat=init_lat,min_lon=init_lon,max_lat=init_lat,max_lon=init_lon;
			console.log( min_lat + ' - ' + max_lat );
			console.log( min_lon + ' - ' + max_lon );
			data.features.forEach( function(f) {
				var lat = f.geometry.coordinates[1], lon = f.geometry.coordinates[0];
				console.log('lat='+lat+' lon='+lon);
				min_lon = ( lon < min_lon )? lon : min_lon;
				max_lon = ( lon > max_lon )? lon : max_lon;
				min_lat = ( lat < min_lat )? lat : min_lat;
				max_lat = ( lat > max_lat )? lat : max_lat;
			});
			console.log( min_lon + ' - ' + max_lon );
			console.log( min_lat + ' - ' + max_lat );
			map.fitBounds(L.latLngBounds( L.latLng(min_lat,min_lon),L.latLng(max_lat,max_lon) ), { } );
			L.geoJSON( data, {
				onEachFeature: function (feature, layer) {
				},
				pointToLayer: function (feature, latlng) {
					//console.log(feature);
					return L.marker(latlng, {
						title: 'wifi access point',
						alt: 'wifi access point',
						opacity: 0.8,
						//			icon: L.icon({
						//				iconUrl: 'wifi.svg',
						//				iconSize: 20,
						//				iconAnchor:[10,20],
						//			}),
					}).bindPopup(feature.properties.description);
				},
			}).addTo(map);
		},
		function(data,textStatus,jqXHR) {
			console.log('GET '+url+' failed: ' + textStatus);
			console.log( 'Detailed error thrown follows:' );
			console.log( errorThrown );
		}
	);

});
