if (Meteor.isClient) {

  Template.form.rendered = function(){

    $( "#webDevSlider" ).slider({
      name: "webDev",
      min: 0,
      max:10,
       slide: function( event, ui ) {
         $( "#webVal" ).val(ui.value );
       }
    });
    $( "#webVal" ).val($( "#webDevSlider" ).slider( "value" ) );

    $( "#DataScienceSlider" ).slider({
      name: "dataScience",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#dataSciVal" ).val(ui.value );
      }
    });
    $( "#dataSciVal" ).val($( "#DataScienceSlider" ).slider( "value" ) );

    $( "#virtualRealitySlider" ).slider({
      name: "virtualReality",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#VRVal" ).val(ui.value );
      }
    });
    $( "#VRVal" ).val($( "#virtualRealitySlider" ).slider( "value" ) );

    $( "#hardwareSlider" ).slider({
      name: "hardware",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#hardwareVal" ).val(ui.value );
      }
    });
    $( "#hardwareVal" ).val($( "#hardwareSlider" ).slider( "value" ) );

    $( "#MobileAppSlider" ).slider({
      name: "mobileApp",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#mobileVal" ).val(ui.value );
      }
    });
    $( "#mobileVal" ).val($( "#MobileAppSlider" ).slider( "value" ) );

    $( "#gameDevSlider" ).slider({
      name: "gameDev",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#gameDevVal" ).val(ui.value );
      }
    });
    $( "#gameDevVal" ).val($( "#gameDevSlider" ).slider( "value" ) );

    $( "#javaScriptSlider" ).slider({
      name: "JavaScript",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#javaScriptVal" ).val(ui.value );
      }
    });
    $( "#javaScriptVal" ).val($( "#javaScriptSlider" ).slider( "value" ) );

    $( "#PHPSlider" ).slider({
      name: "PHP",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#PHPVal" ).val(ui.value );
      }
    });
    $( "#PHPVal" ).val($( "#PHPSlider" ).slider( "value" ) );

    $( "#rubySlider" ).slider({
      name: "ruby",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#rubyVal" ).val(ui.value );
      }
    });
    $( "#rubyVal" ).val($( "#rubySlider" ).slider( "value" ) );

    $( "#cSlider" ).slider({
      name: "c",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#cVal" ).val(ui.value );
      }
    });
    $( "#cVal" ).val($( "#cSlider" ).slider( "value" ) );

    $( "#javaSlider" ).slider({
      name: "java",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#javaVal" ).val(ui.value );
      }
    });
    $( "#javaVal" ).val($( "#javaSlider" ).slider( "value" ) );

    $( "#cSharpeSlider" ).slider({
      name: "cSharpe",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#cSharpeVal" ).val(ui.value );
      }
    });
    $( "#cSharpeVal" ).val($( "#cSharpeSlider" ).slider( "value" ) );

    $( "#pythonSlider" ).slider({
      name: "python",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#pythonVal" ).val(ui.value );
      }
    });
    $( "#pythonVal" ).val($( "#pythonSlider" ).slider( "value" ) );

    $( "#microsoftSlider" ).slider({
      name: "Microsoft",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#microsoftVal" ).val(ui.value );
      }
    });
    $( "#microsoftVal" ).val($( "#microsoftSlider" ).slider( "value" ) );

    $( "#bloombergSlider" ).slider({
      name: "Bloomberg",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#bloombergVal" ).val(ui.value );
      }
    });
    $( "#bloombergVal" ).val($( "#bloombergSlider" ).slider( "value" ) );

    $( "#googleSlider" ).slider({
      name: "Google",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#googleVal" ).val(ui.value );
      }
    });
    $( "#googleVal" ).val($( "#googleSlider" ).slider( "value" ) );

    $( "#mongoDBSlider" ).slider({
      name: "MongoDB",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#mongoDBVal" ).val(ui.value );
      }
    });
    $( "#mongoDBVal" ).val($( "#mongoDBSlider" ).slider( "value" ) );

    $( "#viacomSlider" ).slider({
      name: "Viacom",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#viacomVal" ).val(ui.value );
      }
    });
    $( "#viacomVal" ).val($( "#viacomSlider" ).slider( "value" ) );

    $( "#digitalOceanSlider" ).slider({
      name: "DigitalOcean",
      min: 0,
      max:10,
      slide: function( event, ui ) {
        $( "#digitalOceanVal" ).val(ui.value );
      }
    });
    $( "#digitalOceanVal" ).val($( "#digitalOceanSlider" ).slider( "value" ) );

  }
};
