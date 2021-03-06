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

$(document).ready(function () {
  getWorkDayScheduler();
  getCurrentHour();

  $("#showNotification").hide();

  $(".saveBtn").on("click", function () {
    let hour = $(this).parent().attr("id");
    let description = $(this).parent().children("textarea").val();
    localStorage.setItem(hour, description);

    $("#showNotification").fadeIn();
    $("#showNotification").fadeOut(3000);
  });
});

$("#currentDay").text(getTodayDate());

setInterval(getCurrentHour, 15000); //update color time every 15 mintues

function getCurrentHour() {
  console.log("checking Ttime");
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
