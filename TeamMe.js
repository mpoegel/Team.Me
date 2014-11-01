// NOTE:
// This code will be executed on both the client and the server!

// MongoDB
Events = new Meteor.Collection("Events");

Router.route('/', function () {
// render the Home template with a custom data context
this.render('home', {data: {title: 'TeamMe'}});
});

Router.route('/go');
Router.route('/form');
Router.route('/event');
