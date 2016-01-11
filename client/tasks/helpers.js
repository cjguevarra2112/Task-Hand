Template.tasks.helpers({
	'task': function() {
		var currentList = this._id;
		return Tasks.find({listId: currentList});
	}
});
