Markers = new Mongo.Collection('markers');

Meteor.methods({
	'_insert': function(data) {
		if(Meteor.users.findOne()) {

			data.time = new Date();
			Markers.insert(data);
		}
	},
	'_update': function(data, upd) {
		if(Meteor.users.findOne()) {
			var obj = {'$set': upd}
			Markers.update(data, obj);
		}
	},
	'_remove': function(data) {
		if(Meteor.users.findOne()) {
			data.userId = Meteor.users.findOne()._id;
			Markers.remove(data);
		}
	},
	'_clear': function(data) {
		if(Meteor.users.findOne()) {
			Markers.remove(data);
		}
	},
	download: function(data) {
		var collection = data;
		var heading = true; // Optional, defaults to true
		var delimiter = ";" // Optional, defaults to ",";
		return exportcsv.exportToCSV(collection, heading, delimiter);
	}

});
