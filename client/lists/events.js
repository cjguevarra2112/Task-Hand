Template.addlist.events({
	'submit form': function(e) {
		e.preventDefault();
		var listName = $("[name=listName]").val();
		Meteor.call("createNewList", listName, function(error, results){
			$("[name=listName]").val("");
		});

	}
});
