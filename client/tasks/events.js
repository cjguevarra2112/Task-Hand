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
