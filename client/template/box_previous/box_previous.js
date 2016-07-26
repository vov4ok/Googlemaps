Template.boxPrevious.helpers({
	fousquarequery: function() {
		var arr = Markers.find().fetch();
		arr.forEach(function(e) {
			var curr_date = e.time.getDate();
			var curr_month = e.time.getMonth() + 1;
			var curr_year = e.time.getFullYear();
			var h = e.time.getHours();
			var hours = (h<10)?('0'+h):(h);
			var m = e.time.getMinutes();
			var minutes = (m<10)?('0'+m):(m);
			e.lat = e.ll.split(',')[0];
			e.lng = e.ll.split(',')[1];
			e.radius = ~~(+e.radius / 1000) + ' km';
			e.date = curr_date + "/" + curr_month + "/" + curr_year + " " + hours + ":" + minutes;

		})
		return arr;
	}
})

Template.boxPrevious.events({
	'click .previous-queries-icon': function(e, tmp) {

		// stop emersion
    e = e || window.e // кросс-браузерно

    if (e.stopPropagation) {
        // Вариант стандарта W3C:
        e.stopPropagation()
    } else {
        // Вариант Internet Explorer:
        e.cancelBubble = true
    }
		// end stop emersion

			var obj = {};
			obj._id = e.toElement.parentElement.lastElementChild.innerText;

			 Meteor.call('_remove', obj);

			 // clear markers
			for(var op in GoogleMaps.markers) {
				if(GoogleMaps.markers[op].setMap != undefined) {
					GoogleMaps.markers[op].setMap(null);
				}
				google.maps.event.clearInstanceListeners( GoogleMaps.markers[op] );
				delete GoogleMaps.markers[op];
			}
			Session.set('markersSess', null);
		// end clear markers

	},
	'click .div-previous-queries-item > tr': function(e, tmp) {

		// var str = 'nextElementSibling';
		var obj = {};
		var obj1 = {};
		var arr = ['query', 'll', 'radius'];

		obj1._id = e.toElement.parentElement.lastElementChild.innerText;
		obj = Markers.findOne(obj1);
		obj1 = _.pick(obj, arr);

		// clear markers
			for(var op in GoogleMaps.markers) {
				if (GoogleMaps.markers[op].setMap != undefined) {
				GoogleMaps.markers[op].setMap(null);
			}
				google.maps.event.clearInstanceListeners( GoogleMaps.markers[op] );
				delete GoogleMaps.markers[op];
			}
		// end clear markers

		// create markers and create histiry
			Foursquare.find(obj1, function(error, result) {
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
							id: elem.id
					})
					GoogleMaps.markers[elem.id] = marker;
					// end create Markers

					arr.push(data);
				});
				Session.set('markersSess', arr);
			})
		// create markers and create histiry

	}

})