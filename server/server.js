if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.call("demo");
  });

  Meteor.methods({
    demo: function() {
      console.log("Running Demo...");

      names = ["John Harkness", "Matt Smith", "Clara Oswald",
               "K-9", "Davros", "David Tennent", "TARDIS",
               "Master"];
      eventNames = ["HackRPI", "YHack", "Hacks out of a Hat"];
      eventPops = [500, 150, 12];
      numAttrs = 20;
      maxAttrVal = 10;

      // populate each event with random test data
      for (var ename=0; ename<eventNames.length; ename++) {

        var people = [];
        var numPs = eventPops[ename];
        var thisName = eventNames[ename];

        for (var i=0; i<numPs; i++) {
          var n = names[Math.floor(Math.random()*names.length)];
          var p = "867-5309";
          var g = "http://github.com";
          var a = {};

          for (var k=0; k<numAttrs; k++) {
            a[k.toString()] = Math.floor(Math.random()*maxAttrVal);
          }

          var person = {
            name: n,
            phone: p,
            github: g,
            attributes: a
          };

          people.push(person);
        }

        Events.insert({
          name: thisName,
          numPeople: numPs,
          participants: people
        });

      }

    }
  });


}
