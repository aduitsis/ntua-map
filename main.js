define("main",['require','https://unpkg.com/leaflet@1.0.3/dist/leaflet.js'],function(require,leaflet) {
    // refer to RFC7946 for The GeoJSON Format
    // https://tools.ietf.org/html/rfc7946
    var f = {
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "coordinates": [
                        [
                            23.781981,
                            37.977722
                        ],
                        [
                            23.782434,
                            37.977281
                        ],
                        [
                            23.784898,
                            37.978174
                        ],
                        [
                            23.78305,
                            37.979028
                        ]
                    ],
                    "type": "MultiPoint"
                },
                "id": "77005bc5865fea0cad158d1b31880635"
            }
        ],
        "type": "FeatureCollection"
    };

    var map = L.map('map').setView([37.97765252366751, 23.78303474471221], 16);

    var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var mapboxurl = 'https://api.mapbox.com/styles/v1/aduitsis/cj0838v9n002k2sqpyabeut6q/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWR1aXRzaXMiLCJhIjoiY2owODJqdnFoMDRzaDMzcGVmeTNxNGJoMCJ9._b-ydVC6mADhaiwuEMjW4A';

    L.tileLayer(url, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 23,
        //    id: 'your.mapbox.project.id',
        //    accessToken: 'pk.eyJ1IjoiYWR1aXRzaXMiLCJhIjoiY2owODJqdnFoMDRzaDMzcGVmeTNxNGJoMCJ9._b-ydVC6mADhaiwuEMjW4A'
    }).addTo(map);


    L.geoJSON(f, {
        onEachFeature: function (feature, layer) {
        },
        pointToLayer: function (feature, latlng) {
            console.log(feature);
            return L.marker(latlng, {
                title: 'wifi access point',
                alt: 'wifi access point',
                opacity: 0.8,
                //			icon: L.icon({
                //				iconUrl: 'wifi.svg',
                //				iconSize: 20,
                //				iconAnchor:[10,20],
                //			}),
            });
        },
    }).addTo(map);
});