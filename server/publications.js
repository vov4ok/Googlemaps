Meteor.publish('markers', function() {
	return Markers.find({'userId': this.userId});
});


Meteor.startup(function() {
	Foursquare.init({
		id: 'IUTCKP0GUHRIRTK0MZU2RZBSJPXKM43WCY2L520TBHQ32YBM',
		secret: '150GFTHUUMWVSJTX4MLPCOGPU4GM4DBGLUFFAYAMV2AKC0BD',
		authOnly: false // need auth for using or no?
	});
})