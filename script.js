// current time needs to be displayed- dayjs() is needed
//-----needs to be in header
// depending on the hour, the textareas will need to change colors for past, present, future
//-----will need a if statement with a condition comparing real time to event scheduler time
//on click function for save button
// when save button is clicked, needs value needs to match the time 
// add task to local storage
//---- needs key that matches the time on calender and text value 


// on click function to add task to local storage 
$(function () {
  var saveButton = $(".saveBtn");
   saveButton.on("click", function() { //on click function that will run each time the button is clicked
    var button = $(this); //targets whichever button you click 
    console.log(this);//console.log to make sure
    var textArea = button.siblings("textarea"); //targetting textarea since its is a sibling
   //the following below will be for local storage key values
    var hour = textArea.data("hour"); //is targetting the data attr value in the textarea
    var text = textArea.val(); //getting input value from textArea
    localStorage.setItem(hour, text); // placing it in local storage with the data value and text value 
    notify()
   
  }) 
 // displays message on screen when task have been saved and fades out after 3secs
function notify(){
  var inform = $("#inform");
  inform.css("display", "block");
  inform.text("Your Task has been saved to local storage!");
  inform.fadeOut(3000);
}

// loops through the hour divs from 9 to 17 and captures the value that was saved to local storage
// and if the text is saved the task shoudld stil be displayed on the page and in storage when the page is refreshed
// or is task is deleted then an empty string will show in storage and page
  function showTasks() { //hour symbols the div id 
    for(var hour = 9; hour <= 17; hour++ ) {
      var text = localStorage.getItem(hour) || "";
      $(`#${hour}`).children("textarea").val(text);
    }
  }

  // changes the color of the text area based of past, present, or future hour
  var realTime = dayjs().hour(); // real time
  $(".time-block").each(function() { //goes through each time-block div
  var blockTime = $(this).attr("id"); // this is equal to the ID of the div individually
  if (realTime > blockTime) {
    $(this).children().eq(1).addClass("past") // this "blockTime div" go grab children, at 1 index and set class and set color based of condition
  } else if (realTime < blockTime) {
    $(this).children().eq(1).addClass("future")
  } else {
    $(this).children().eq(1).addClass("present")
  }
})
  // displaying the date and time currently
  var currentDate = dayjs();
  $("#currentDay").text(currentDate.format("dddd, MMM D, YYYY, H:mm A"))
  
  showTasks()
});
