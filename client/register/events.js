Template.register.events({
	'submit form': function(e) {
		e.preventDefault();
	}
});

Template.register.onRendered(function() {
	var validator = $("#register").validate({
		rules: {
			fname: {
				maxlength: 55
			},
			lname: {
				maxlength: 55
			},
			email: {
				email: true,
				required: true,
			},
			password: {
				required: true,
				minlength: 6
			}
		},

		submitHandler: function(e) {
			var user = {
				'email': $("[name=email]").val(),
				'password': $("[name=password]").val(),
				'profile': {
					'fname': $("[name=fname]").val(),
					'lname': $("[name=lname]").val()
				}
			};

			Accounts.createUser(user, function(error) {
				if (error) {
					if (error.reason == "Email already exists.") {
						validator.showErrors({
							email: "The email you entered is already in use! Choose a different one."
						})
					}
				} else {
					Router.go("home");
				}
			});


		}
	});
});
