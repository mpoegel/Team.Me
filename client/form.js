if (Meteor.isClient) {

  Template.form.rendered = function(){

    $( "#webDevSlider" ).slider({
      name: "webDev",
      min: 0,
      max:10
    });
    $( "#DataScienceSlider" ).slider({
      name: "dataScience",
      min: 0,
      max:10
    });
    $( "#virtualRealitySlider" ).slider({
      name: "virtualReality",
      min: 0,
      max:10
    });
    $( "#hardwareSlider" ).slider({
      name: "hardware",
      min: 0,
      max:10
    });
    $( "#MobileAppSlider" ).slider({
      name: "mobileApp",
      min: 0,
      max:10
    });
    $( "#gameDevSlider" ).slider({
      name: "gameDev",
      min: 0,
      max:10
    });
    $( "#javaScriptSlider" ).slider({
      name: "JavaScript",
      min: 0,
      max:10
    });
    $( "#PHPSlider" ).slider({
      name: "PHP",
      min: 0,
      max:10
    });
    $( "#rubySlider" ).slider({
      name: "ruby",
      min: 0,
      max:10
    });
    $( "#cSlider" ).slider({
      name: "c",
      min: 0,
      max:10
    });
    $( "#javaSlider" ).slider({
      name: "java",
      min: 0,
      max:10
    });
    $( "#cSharpeSlider" ).slider({
      name: "cSharpe",
      min: 0,
      max:10
    });
    $( "#pythonSlider" ).slider({
      name: "python",
      min: 0,
      max:10
    });
    $( "#microsoftSlider" ).slider({
      name: "Microsoft",
      min: 0,
      max:10
    });
    $( "#bloombergSlider" ).slider({
      name: "Bloomberg",
      min: 0,
      max:10
    });
    $( "#googleSlider" ).slider({
      name: "Google",
      min: 0,
      max:10
    });
    $( "#mongoDBSlider" ).slider({
      name: "MongoDB",
      min: 0,
      max:10
    });
    $( "#viacomSlider" ).slider({
      name: "Viacom",
      min: 0,
      max:10
    });
    $( "#digitalOceanSlider" ).slider({
      name: "DigitalOcean",
      min: 0,
      max:10
    });

  }
};
