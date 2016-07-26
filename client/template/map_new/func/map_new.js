;(function( window, document ) {
	'use strict';
	var GoogleMaps;
	var window = window;
	var document = document;
	function GMP() {
		this.map = {};
		this._callbacks = {};
		this.place;
		this.markers = {};
	}

	GMP.prototype.load = function( options ) {

		var options = configure(options);
		var script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?'+ options;//+ 'callback=GoogleMaps.initAutocomplete';
		document.body.appendChild(script);

		function configure( configuration ) {
			var options = '';
			var str = '';

				for (var k in configuration) {
					str = (configuration[k] instanceof Array)?configuration[k].join(','):(configuration[k] + '&');
					options += k + '=' + str ;
				}

				return options;
		}
	}

	GMP.prototype.ready = function() {
		return this._ready.get();
	}

	GMP.prototype.initAutocomplete = function() {
			// map.setTilt(45);
			// changeHeading(map);
			// autoRotate(map);
			// this.map;

	}

	GMP.prototype.searchBoxCreate = function( map ) {
				var input,
						searchBox;
				var places;
				var map =  this.map;
				// var markers = [];
				var bounds;
				var icon;
				var data = [];
				var _this = this;

				input = document.getElementById( 'idInputSearch' );
				searchBox = new google.maps.places.SearchBox(input);
				map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				// map.addListener( 'bounds_changed', function() {
				// 	searchBox.setBounds( map.getBounds() );
				// });

			searchBox.addListener( 'places_changed', function() {
					var val = input.value;
					var coold = [];
					coold.push(GoogleMaps.map.center.lat());
					coold.push(GoogleMaps.map.center.lng());
					function rad(par) {
						var arr = [
							'591657550.500000',
							'295828775.300000',
							'147914387.600000',
							'73957193.820000',
							'36978596.910000',
							'18489298.450000',
							'9244649.227000',
							'4622324.614000',
							'2311162.307000',
							'1155581.153000',
							'577790.576700',
							'288895.288400',
							'144447.644200',
							'72223.822090',
							'36111.911040',
							'18055.955520',
							'9027.977761',
							'4513.988880',
							'2256.994440',
							'1128.497220'
							];
							return arr[par]
					}
					var radi = GoogleMaps.map.getZoom();

						// clear all markers
						for(var op in GoogleMaps.markers) {
							if(GoogleMaps.markers[op].setMap != undefined) {
								GoogleMaps.markers[op].setMap(null);
							}
							google.maps.event.clearInstanceListeners( GoogleMaps.markers[op] );
							delete GoogleMaps.markers[op];
						}
						// end clear all markers

					// Foursquare query
					var params = {};
					params.query = val;
					params.ll = coold.join(',');
					params.radius = '10000';
					params.arr = [];
					params.userId = Meteor.userId();

					Foursquare.find(params, function(error, result) {
						result.response.venues.forEach(function(e) {
						params.arr.push(e.id);

						})


					// insert to collection
					Meteor.call('_insert', params);
					// end insert to collection

					 console.log(result);
					 });
					// end Foursquare

					// create bounds
				// places = searchBox.getPlaces();
				// bounds = new google.maps.LatLngBounds();
				// places.forEach(function(place) {
				// 	if (place.geometry.viewport) {
				// 			// Only geocodes have viewport.
				// 			bounds.union(place.geometry.viewport);
				// 		} else {
				// 			bounds.extend(place.geometry.location);
				// 		}
				// 	})
				// 	 map.fitBounds(bounds);
					// end create bounds
				this.input = input;
				this.searchBox = searchBox;
			});

		}


		GMP.prototype.readyObserve = function( name, cb ) {
			if (! this._callbacks[name]) {
				this._callbacks[name] = [];
			}
			// make sure we run the callback only once
			// as the tilesloaded event will also run after initial load
			this._callbacks[name].push(_.once(cb));
		}


		// function changeHeading( _this ) {
		// 	var heading = _this.getHeading() || 0;
		// 	_this.setHeading(+heading + 90);
		// }

		// function autoRotate(_this) {
		// 	if( _this.getTilt() !== 0 ) {
		// 		window.setInterval(function() {
		// 			changeHeading(_this);
		// 		}, 5e3);
		// 	}
		// }


		GoogleMaps = new GMP();

		if( !window.GoogleMaps ) {
			window.GoogleMaps = GoogleMaps;
		}



})( window, document );
