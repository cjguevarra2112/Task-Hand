// Collections

Lists = new Mongo.Collection("lists");
Tasks = new Mongo.Collection("tasks");

// Routes
Router.configure({
	layoutTemplate: "main-template"
});

Router.route("/", {
	name: "home",
	template: "home"
});

Router.route("/login");
Router.route("/register");
Router.route("/dashboard");
