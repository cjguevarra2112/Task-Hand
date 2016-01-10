// Collections

Lists = new Mongo.Collection("lists");
Tasks = new Mongo.Collection("tasks");

// Routes
Router.configure({
	layoutTemplate: "main"
});

Router.route("/", {
	name: "home",
	template: "home"
});

Router.route("/login", {
	onBeforeAction: function() {
		var currentUser = Meteor.userId();
		if (currentUser) {
			Router.go("home");
		} else {
			this.next();
		}
	}
});

Router.route("/register", {
	onBeforeAction: function() {
		var currentUser = Meteor.userId();
		if (currentUser) {
			Router.go("home");
		} else {
			this.next();
		}
	}
});

Router.route("/dashboard", {
	onBeforeAction: function() {
		var currentUser = Meteor.userId();
		if (!currentUser) {
			Router.go("login");
		} else {
			this.next();
		}
	},
	data: function() {
		var currentUserInfo = Meteor.user();
		console.log(currentUserInfo);
		return currentUserInfo;
	}
});
