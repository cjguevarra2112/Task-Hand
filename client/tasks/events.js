Template.addtask.events({
	'submit form': function(e) {
		e.preventDefault();

		var newTask = $("[name=newTaskName]").val();
		var currentList = this._id;

		Meteor.call("createTask", newTask, currentList, function(error, task){
			if(error) {
				console.log(error.reason);
			}

			$("[name=newTaskName]").val("");
		});
	}
});

Template.taskItem.events({
	'click .remove-task': function(e) {
		e.preventDefault();

		var currentTask = this._id;
		var confirm = window.confirm("Really delete this task?");
		if (confirm) {
			Meteor.call("removeTask", currentTask);
		}
	},

	'keyup [name=taskName]': function (e) {
		if (e.which == 13 || e.which == 37) {
			$(event.target).blur();
		} else {
			var taskId = this._id;
			var updatedName = $(event.target).val();
			Meteor.call("updateTask", taskId, updatedName);
		}
	},
	'click .task-status': function(e) {
		e.preventDefault();

		var taskId = this._id;
		var currentStatus = this.status;
		var newStatus = $(event.target).closest("a").text();
		if(newStatus != currentStatus) {
			Meteor.call("updateTaskStatus", taskId, newStatus);
		}


	}
});
