// Initialize Firebase
var config = {
  apiKey: "AIzaSyCt0ZarrokrkQNYfkopZsXQI7cKAg5DtIQ",
  authDomain: "click-counter-3b855.firebaseapp.com",
  databaseURL: "https://click-counter-3b855.firebaseio.com",
  projectId: "click-counter-3b855",
  storageBucket: "click-counter-3b855.appspot.com",
  messagingSenderId: "74391923227"
};
firebase.initializeApp(config);

var database = firebase.database();

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


// Difference between first time and current time
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)  
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minutes until train arrival
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var firstTime = '3:30';


$('#submitBtn').on('click', function () {
  event.preventDefault();

  var name='';
  var destination='';
  var firstTrainTime = '';
  var frequency='';
  var nextArrival= '';
  var minutesAway = '';
  var diffTime = '';
  var tMinutesTillTrain ='';
  var firstTime ='';
  


  name = $('#name').val().trim();
  destination = $('#destination').val().trim();
  firstTrainTime = $('#firstTrainTime').val().trim();
  frequency = $('#frequency').val().trim();

 





  // DONE: add to database here -- use .push() instead of .set(), include dateAdded: firebase.database.ServerValue.TIMESTAMP
  database.ref().push({
    name: name,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// add firebase watcher
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

  var sv = snapshot.val();

  // DONE: log the data from the database
  console.log(sv.name);
  console.log(sv.destination);
  console.log(sv.firstTrainTime);
  console.log(sv.frequency);

  // DONE: push the new stuff to the HTML
  var html =
    '<tr class="something">' +
    '<td>' + sv.name + '</td>' +
    '<td>' + sv.destination + '</td>' +
    '<td>' + sv.frequency + '</td>' +
    '<td>' + '' + '</td>' +
    '<td>' + '' + '</td>' +
    // Add Train Button 
    "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +   
    
    '</tr>';

  $('#outPutRow').append(html);

}, function (errorObject) {
  console.log("The Read Failed: " + errorObject.code);

});
// Remove Train Button

$("body").on("click", ".remove-train", function(){
    $(this).closest ('tr').remove();
    getKey = $(this).parent().parent().attr('id');
    dataRef.child(getKey).remove();
}); 



