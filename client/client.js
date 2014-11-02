if (Meteor.isClient) {

  Template.go.events({
    'click #createEventBtn': function() {
      // add a new event to the database
      var name = $("#inputEventName").val();
      if (name == "") return;
      Events.insert({
        name: name,
        numPeople: 0,
        participants: []
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
    var curr_event = Session.get("current_event");
    var e = Events.find({ _id:curr_event }).fetch()[0];
    // var names = [];
    // for (var i=0; i<e.participants.length; i++) {
    //
    // }
    return e.participants;
  };


}
