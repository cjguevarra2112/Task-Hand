// Publishes
Meteor.publish('lists', function() {
	var currentUser = this.userId;
	return Lists.find({createdBy: currentUser});
});


// Methods
Meteor.methods({
	'createNewList': function(listName) {
		var currentUser = Meteor.userId();

		check(listName, String);

		if(listName.trim() == "") {
			throw new Meteor.Error("emtpy-name", "You must enter a list name");
		}

		if(!currentUser) {
			throw new Meteor.Error("not-logged-in", "You're not logged in");
		}

		var newList = {
			'name': listName,
			'createdBy': currentUser,
			'collaborators': [currentUser],
			'createdOn': new Date()
		};

		return Lists.insert(newList);
	},

	// Tasks
	'createTask': function(taskName, listId) {
		var currentUser = Meteor.userId();

		check(taskName, String);
		check(listId, String);

		if (!currentUser) {
			throw new Meteor.Error("not-logged-in", "You're not logged in.");
		}

		if(taskName.trim() == "") {
			throw new Meteor.Error("empty-name", "You must enter a task name.");
		}

		if (Lists.find({_id: listId}).count() == 0) {
			throw new Meteor.Error("list-not-found", "List not found");
		}

		var newTask = {
			name: taskName,
			status: "not-done", // pending, in progress, completed
			createdBy: currentUser,
			createdAt: new Date(),
			listId: listId
		};

		return Tasks.insert(newTask);
	}
});
