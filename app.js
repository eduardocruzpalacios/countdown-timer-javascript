// CONSTANTS & VARIABLES
const decadesElement = document.getElementById("decades");
const yearsElement = document.getElementById("years");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

var datetime;
var error = document.getElementById('errormsg');
var count = document.getElementById('count');

// IT TRIGGERS WHEN START BUTTON IS CLICKED
function start() {

    datetime = document.getElementById('datetime').value;
    const end = new Date(datetime);

    now = new Date();

    const difference = (end - now);
    // console.log(difference);

    // VALIDATE SELECTED DATE BY USER
    if (datetime == '' || datetime == null) {
        error.innerHTML = "set up a date!";
    } else if (difference <= 0) {
        error.innerHTML = "the end date must be later than now!";
    } else {
        error.style.display = "none";
        count.style.display = 'flex';
        // console.log(datetime);
        setInterval(countdown, 1);
    }
}

// IT TRIGGERS 1000 TIMES PER SECOND FROM START BUTTON CLICKED
function countdown() {
    const endDate = new Date(datetime);
    // console.log(endDate);

    const currentDate = new Date();
    // console.log(currentDate);

    var totalSeconds = (endDate - currentDate);

    const milliseconds = Math.floor(totalSeconds) % 1000;

    totalSeconds /= 1000;

    const seconds = Math.floor(totalSeconds) % 60;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 3600 / 24) % 365;
    const years = Math.floor(totalSeconds / 3600 / 24 / 365) % 10;
    const decades = Math.floor(totalSeconds / 3600 / 24 / 365 / 10);

    millisecondsElement.innerHTML = milliseconds;
    secondsElement.innerHTML = formatTime(seconds);
    minutesElement.innerHTML = formatTime(mins);
    hoursElement.innerHTML = formatTime(hours);
    daysElement.innerHTML = days;
    yearsElement.innerHTML = years;
    decadesElement.innerHTML = decades;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}