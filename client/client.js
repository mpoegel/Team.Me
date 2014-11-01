if (Meteor.isClient) {

  Template.form.events({
    'click #submitForm': function() {
      // gather all the information in the form and store it in the datebase

    }
  });

  Template.go.events({
    'click #createEventBtn': function() {
      // add a new event to the database
      var name = $("#inputEventName").val();
      if (name == "") return;
      Events.insert({
        name: name,
        numPeople: 0
      });
    },
    'click #eventList li': function() {
      // set a session key to reflect the event that clicked
      Session.set("current_event", this._id);
    }
  });

  Template.go.allEvents = function() {
    return Events.find();
  };

  Template.event.participants = function() {
    return;
  };

}
