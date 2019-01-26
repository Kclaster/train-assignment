

 var config = {
    apiKey: "AIzaSyD6oM9Hw6ofNtkh3ecrs8cKU3QzwPfBoxY",
    authDomain: "train-4b7c1.firebaseapp.com",
    databaseURL: "//train-4b7c1.firebaseio.com",
    projectId: "train-4b7c1",
    storageBucket: "train-4b7c1.appspot.com",
    messagingSenderId: "72852055940"
  };
  firebase.initializeApp(config);


  var database = firebase.database();


  database.ref().on("child_added", function(childsnapshot) {




      var diff = moment().diff(moment(childsnapshot.val().time, 'H:mm a'), 'minutes');

      var time = childsnapshot.val().time;


      console.log(time);
      var displayedTime = moment(time, 'HH:mm').format('hh:mm a')

      var timeLeft = diff % childsnapshot.val().frequency;

      var timeLeft = childsnapshot.val().frequency - timeLeft;

      nextStop = moment().add(timeLeft, 'm').format('h:mm a');



      $("#schedule-section").append(
          "<tr><td>" + childsnapshot.val().trainName + "</td><td>" + childsnapshot.val().destination + "</td><td>" + displayedTime + "</td><td>" + childsnapshot.val().frequency + ' mn.' + 
          "</td><td>"  + timeLeft + ' mn.' + 
          "</td><td>" + nextStop + 
          "</td></tr>" );



  });

  $("#submit").on("click", function(event) {
      event.preventDefault();
      if ($("#name-input").val().trim() !== "" && $("#destination-input").val().trim() !== "" && $("#frequency-input").val().trim() !== "" && $("#time-input").val().trim() !== "") {
      var name = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var time = $("#time-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      console.log(time);

      database.ref().push({
          trainName: name,
          destination: destination,
          time: time,
          frequency: frequency
      

      });

  }
});