var markersData = new ReactiveVar(null);


Template.resultSearch.onCreated(function() {
	Session.set('markersSess', '');
});

Markers.find().observe({
	added: function(docu) {
		markersData.set(docu);

	},
	changed: function(newDocu, oldDocu) {

	},
	removed: function(oldDocu) {
		console.log('Markers.find().observe: removed');

		oldDocu.arr.forEach(function(e) {
		if(GoogleMaps.markers[e].setMap !== undefined) {
			// Remove the marker from the map
			GoogleMaps.markers[e].setMap(null);
		// Clear the event listener
		google.maps.event.clearInstanceListeners(
			GoogleMaps.markers[e]);

		// Remove the reference to this marker instance
		delete GoogleMaps.markers[e];
		}

	})
	}
});

Tracker.autorun(function() {
	if(markersData.get() != null) {
		var filter = ['ll', 'radius', 'query', 'userId'];
		var docu = markersData.get();
		var doc = _.pick(docu, filter);
		Foursquare.find(doc, function(error, result) {
			var result = result;
			var arrMarkers = result.response.venues;
			var arr = [];
			arrMarkers.forEach(function(elem) {
				var data = {};
				data.name = elem.name;
				data.city = (elem.location.city)?(elem.location.city):('no City');
				data.address = elem.location.formattedAddress.join(', ');
				data.lat = elem.location.lat;
				data.lng = elem.location.lng;

				// create Markers
				var marker = new google.maps.Marker({
						position: new google.maps.LatLng(data.lat, data.lng),
						map: GoogleMaps.map,
						title: elem.name,
						id: elem.id,
						userId: doc.userId
				})
				GoogleMaps.markers[elem.id] = marker;
				// end create Markers

				arr.push(data);
			});
			Session.set('markersSess', arr);
		})
	}
});

Template.resultSearch.helpers({
	markerss: function() {
		return Session.get('markersSess');
	},
	countQuerys: function() {
		return Session.get('markersSess').length + ' Venues';
	}
});