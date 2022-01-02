const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const HOURS = [];

// A $( document ).ready() block.
$(document).ready(function () {
  getWorkDayScheduler();

  $("#showNotification").hide();

  $(".saveBtn").on("click", function () {
    let hour = $(this).parent().attr("id");
    let description = $(this).parent().children("textarea").val();

    console.log(description);
    localStorage.setItem(hour, description);

    //myway
    $("#showNotification").fadeIn();
    $("#showNotification").fadeOut(3000);
  });

  getCurrentHour();
});

$("#currentDay").text(getTodayDate());

function getCurrentHour() {
  let date = new Date();
  let getCurrentHour = date.getHours();
  let getTimeBlockHour = 0;

  for (let i = 0; i < HOURS.length; i++) {
    getTimeBlockHour = parseInt(HOURS[i].split("-")[1]);
    let name = `#${HOURS[i]} .description`;

    if (getTimeBlockHour < getCurrentHour) {
      $(name).addClass("past");
    } else if (getCurrentHour === getTimeBlockHour) {
      $(name).removeClass("past");
      $(name).addClass("present");
    } else {
      $(name).removeClass("past");
      $(name).removeClass("present");
      $(name).addClass("future");
    }
  }
}
function getWorkDayScheduler() {
  let divs = document.querySelectorAll("div");

  for (var i = 0; i < divs.length; i++) {
    if (divs[i].getAttribute("id")) {
      let hourId = divs[i].getAttribute("id");

      HOURS.push(hourId);

      let name = `#${hourId} .description`;

      $(name).val(localStorage.getItem(hourId));
    }
  }
}

function getTodayDate() {
  let date = new Date();

  var todayDate = `${WEEKDAY[date.getDay()]}, ${
    MONTH[date.getMonth()]
  } ${getOrdinalNum(date.getDate())}`;

  return todayDate;
}

function getOrdinalNum(n) {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
}

//function getWorkDayScheduler() {
//1st way
/*let children = document.getElementsByTagName("div");
  for (var i = 0; i < children.length; i++) {
    if (children[i].getAttribute("id")) {
      let hourId = children[i].getAttribute("id");

      let name = `#${hourId} .description`;

      $(name).val(localStorage.getItem(hourId));
    }
  }*/

//}

//another way
// Show notification that item was saved to localStorage by adding class 'show'
//$(".notification").addClass("show");

// Timeout to remove 'show' class after 5 seconds
// setTimeout(function () {
//   $(".notification").removeClass("show");
// }, 5000);
