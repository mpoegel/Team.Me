if (Meteor.isClient) {

  Template.form.rendered = function(){

    $( "#webDevSlider" ).slider({
      name: "webDev",
      min: 0,
      max:10
    });
    
  }


};
