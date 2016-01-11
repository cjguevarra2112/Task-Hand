Template.tasks.helpers({
	'task': function() {
		var currentList = this._id;
		return Tasks.find({}, {sort: {createdAt: -1}});
	}
});

Template.taskItem.helpers({
	'setStatus': function() {
		var currentStatus = this.status;
		var statuses = {
			'pending': 'label-default',
			'in progress': 'label-primary',
			'completed': 'label-success'
		};

		return statuses[currentStatus];
	},

	'disabledStatus': function(status) {
		var currentStatus = this.status;
		return (currentStatus == status) ? "disabled" : "";
	}
});
