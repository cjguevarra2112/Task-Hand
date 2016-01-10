Template.main.events({
	'click #off-canvas': function(event) {
		event.preventDefault();
		$('.row-offcanvas').toggleClass('active');
	}
});
