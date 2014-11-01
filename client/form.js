if(Meteor.isClient){
  Template.form.rendered = function(){

    console.log("hello");

    $( "#webDevSlider" ).slider({
      name: "webDev",
      min: 0,
      max:10
    });
    $( "#webDevSlider" ).slider( "option", "name", "WebDev" );
    $( "#webDevSlider" ).slider( "option", "min", 0 );
    $( "#webDevSlider" ).slider( "option", "max", 10 );

};
