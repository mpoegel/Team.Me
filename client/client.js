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

  Template.event.events({
      'click #makeTeams': function() {
          $("#visualization")[0].innerHTML = "Teams are being processed...";
          setTimeout(function(){
              $("#visualization").css({"height":"800px"});
              $("#visualization")[0].innerHTML = "";
              var visual = $("<iframe class='visualization-frame' src='/visualization/index.html'></iframe>");
              $("#visualization").append(visual);
              setTimeout(function(){
                  var curr_event = Session.get("current_event");
                  var eventInfo = Events.find({_id:curr_event}).fetch()[0];
                  var data = eventInfo.data;
                  var fdata = {"items":[]};
                  for (var i = 0;i < data.length;i++){
                      fdata.items.push({
                          "group": data[i].group,
                          "value": data[i].coords
                      });
                  }
                  visual[0].contentWindow.displayGraph(fdata);

                  // Populate groups
                  var colors = visual[0].contentWindow.window.colors;
                  var groups = $("#groups");
                  var ng = $("<ul class='list-group'></ul>");
                  groups.append(ng);
                  for (var g = 0;g < data.length;g++){
                      var ing = [];
                      var names = [];
                      for (var u = 0;u< data.length;u++){
                          if (data[u].group == g){
                              ing.push(u);
                              names.push(eventInfo.participants[u].name);
                          }
                      }
                      if (ing.length > 0){
                          var li = $("<li class='list-group-item'></li>");
                          var e = $("<div></div>");
                          var cstring = colors[g%colors.length].toString(16);
                          while(cstring.length < 6){
                              cstring = "0" + cstring;
                          }
                          e.css({"border-left":"20px solid #" + cstring , "padding-left":"10px", "text-align":"left"});
                          e[0].innerHTML = names.join(",");
                          li.append(e);
                          ng.append(li);
                      }
                  }

                  $("#groupme-button").show();

              },500);
          },5000);
      }
  });


}
