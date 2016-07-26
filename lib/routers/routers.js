Router.configure({
	layoutTemplate:'layout',
	loadingTemplate: 'spinner',
	waitOn() {
		return Meteor.subscribe('markers');
	}
});

Router.map( function() {
	this.route('tSignIn', {
		path:'/',
		onBeforeAction: function(e) {
			if(Meteor.users.findOne() === undefined)
				this.redirect('tSignOut');
			this.next();
		},
		action: function() {
			this.render();
		}
	});
	this.route('tSignOut', {
		path:'/tSignOut',
		onBeforeAction: function(e) {
			if(Meteor.users.findOne())
				this.redirect('tSignIn');
			this.next();
		},
		action: function() {
			this.render();
		}
	});
})