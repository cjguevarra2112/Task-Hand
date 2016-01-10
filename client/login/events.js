Template.login.events({
	'submit form': function(e) {
		e.preventDefault();
	}
});

Template.login.onRendered(function() {
	var validator = $("#login").validate({
		rules: {
			email: {
				email: true
			},
			password: {
				minlength: 6
			}
		},
		submitHandler: function(e) {
			var email = $("[name=email]").val();
			var password = $("[name=password]").val();

			Meteor.loginWithPassword(email, password, function(error){
				if (error) {

					if (error.reason == "User not found") {
						validator.showErrors({
							email: "The email you entered is not registered!"
						});
					}

					if (error.reason == "Incorrect password") {
						validator.showErrors({
							password: "Incorrect password"
						});
					}
					$("[name=password]").val("");
				} else {
					Router.go("home");
				}
			});
		}
	});
});
