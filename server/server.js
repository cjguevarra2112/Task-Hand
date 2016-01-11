// Publishes --------------------------------------------------------

Meteor.publish('lists', function() {
	var currentUser = this.userId;
	return Lists.find({createdBy: currentUser});
});

Meteor.publish('tasks', function(listId) {
	var currentUser = this.userId;
	return Tasks.find({createdBy: currentUser, listId: listId});
});


// Methods ----------------------------------------------------------
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
			status: "pending", // pending, in progress, completed
			createdBy: currentUser,
			createdAt: new Date(),
			listId: listId
		};

		return Tasks.insert(newTask);
	},

	'updateTask': function(taskId, newName) {
		var currentUser = Meteor.userId();

		check(taskId, String);
		check(newName, String);

		if(!currentUser) {
			throw new Meteor.Error("not-logged-in", "You're not logged in.");
		}

		if (newName.trim() == "") {
			throw new Meteor.Error("empty-name", "You must enter a task name");
		}

		if (Tasks.find({_id: taskId}).count() === 0) {
			throw new Meteor.Error("task-not-found", "Task not found.");
		}

		Tasks.update({_id: taskId}, {$set: {name: newName}});
	},
	'removeTask': function(taskId) {
		var currentUser = Meteor.userId();

		check(taskId, String);

		if(!currentUser) {
			throw new Meteor.Error("not-logged-in", "You're not logged in.");
		}

		if (Tasks.find({_id: taskId}).count() === 0) {
			throw new Meteor.Error("task-not-found", "Task not found.");
		}

		Tasks.remove({_id: taskId});
	},

	'updateTaskStatus': function(taskId, status) {
		var currentUser = Meteor.userId();

		check(taskId, String);

		if(!currentUser) {
			throw new Meteor.Error("not-logged-in", "You're not logged in.");
		}

		if (Tasks.find({_id: taskId}).count() === 0) {
			throw new Meteor.Error("task-not-found", "Task not found.");
		}

		var statuses = ['pending', 'in progress', 'completed'];
		if (statuses.indexOf(status) == -1) {
			throw new Meteor.Error("invalid-status", "Invalid Status");
		}

		Tasks.update({_id: taskId}, {$set: {status: status}});
	}
});
