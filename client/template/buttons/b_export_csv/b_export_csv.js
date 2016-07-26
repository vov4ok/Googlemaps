Template.bExportCsv.events({
	'click input[name=export]': function (e, tmp) {

		var arr = Session.get('markersSess');

		 var nameFile = 'fileDownloaded.csv';
		Meteor.call('download', arr, function(err, fileContent) {
			if(fileContent){
				var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
				saveAs(blob, nameFile);
			}
		})
	}
});