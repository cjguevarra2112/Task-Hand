// Collections

Lists = new Mongo.Collection("lists");
Tasks = new Mongo.Collection("tasks");

// Routes
Router.configure({
	layoutTemplate: "main"
});

Router.route("/", {
	name: "home",
	template: "home",
	subscriptions: function() {
		return Meteor.subscribe("lists");
	}
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
	},
	subscriptions: function() {
		return Meteor.subscribe("lists");
	}
});

Router.route("/list/:_id", {
	name: "listPage",
	template: "listPage",
	data: function() {
		var currentUser = Meteor.userId();
		var currentList = this.params._id;
		return Lists.findOne({_id: currentList, createdBy: currentUser});
	},
	onBeforeAction: function() {
		var currentUser = Meteor.userId();

		if (currentUser) {
			this.next();
		} else {
			this.render("login");
		}
	},
	subscriptions: function() {
		var currentList = this.params._id;
		return [Meteor.subscribe("lists"), Meteor.subscribe("tasks", this.params._id)];
	}
});
