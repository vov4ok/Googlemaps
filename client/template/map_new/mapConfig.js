Meteor.startup(()=>{
	GoogleMaps.load({
				'key':'AIzaSyAy_jhkLCZ_boColRXcgCRB7ztwKPnNjkY', // Your project's ID;
				'v': '3.exp',                                    // API version;
				'libraries': [                                   // Add your libraries here;
				'places'
				]
			});

});

Template.mapConteiner.onRendered( function() {
      var options = {
          center: {lat: 50, lng: 30},
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP, // TERRAIN | SATELLITE | HYBRID | ROADMAP
          heading: 90,
          tilt: 45,
        };

      var container = document.getElementById('map');
      // var markers = {};
      var map = new google.maps.Map( container, options );
      //var icon;

        GoogleMaps.map = map;

        GoogleMaps.searchBoxCreate();

 });
