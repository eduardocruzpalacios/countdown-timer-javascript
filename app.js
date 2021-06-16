// CONSTANTS & VARIABLES
const inputContainer = document.getElementById('setup');

const decadesElement = document.getElementById("decades");
const yearsElement = document.getElementById("years");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

var datetime;
const error = document.getElementById('errormsg');
const count = document.getElementById('count');

var difference;

var endDate;
var currentDate;
var totalSeconds;

var interval;
var interval2;
var refreshElement = document.getElementById('refresh');
var refreshTime = 1;

const progressBarElement = document.getElementById('progressBar');
const percentageElement = document.getElementById('percentage');
const progressElement = document.getElementById('progress');

var secondsCurrent = 0;

// CHECK INPUT IS SUPPORTED BY USER'S BROWSER AND CREATE CORRECT INPUT
function checkInput(type) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    return input.type === type;
}

function setButton() {
    const button = document.createElement('button');
    button.setAttribute('onclick', 'start()');
    button.setAttribute('id', 'start');
    button.innerHTML = 'Start';
    inputContainer.appendChild(button);
}

function setLabel(text) {
    const label = document.createElement('label');
    label.innerHTML = text;
    inputContainer.appendChild(label);
}

if (checkInput('datetime-local')) {
    // LABEL
    setLabel('Pick the date and time you wish:');
    // INPUT DATETIME-LOCAL
    const dateTimeLocal = document.createElement('input');
    dateTimeLocal.setAttribute('type', 'datetime-local');
    dateTimeLocal.setAttribute('id', 'datetime');
    inputContainer.appendChild(dateTimeLocal);
    // BUTTON
    setButton();
} else if (checkInput('date') && checkInput('time')) {
    // LABEL
    setLabel('Date:');
    // INPUT DATE
    const date = document.createElement('input');
    date.setAttribute('type', 'date');
    date.setAttribute('id', 'date');
    inputContainer.appendChild(date);
    // LABEL
    setLabel('Time:');
    // INPUT TIME
    const time = document.createElement('input');
    time.setAttribute('type', 'time');
    time.setAttribute('id', 'time');
    time.setAttribute('value', '00:00');
    inputContainer.appendChild(time);
    // BUTTON
    setButton();
} else {
    alert('Sorry, your browser does not support this app');
}

// IT TRIGGERS WHEN START BUTTON IS CLICKED
function start() {

    if (checkInput('datetime-local')) {
        datetime = document.getElementById('datetime').value;
    } else if (checkInput('date') && checkInput('time')) {
        var date = document.getElementById('date').value;
        // console.log(date);

        var time = document.getElementById('time').value;
        // console.log(time);

        datetime = date + 'T' + time;
    }

    // console.log(datetime);

    const end = new Date(datetime);
    const now = new Date();
    difference = (end - now);
    // console.log(difference);

    // VALIDATE SELECTED DATE BY USER (16 IS THE DATETIME FORMAT LENGTH)
    if (datetime == '' || datetime == null || datetime.length < 16) {
        error.innerHTML = "set up a date!";
    } else if (difference <= 0) {
        error.innerHTML = "the end date must be later than now!";
    } else {
        error.style.display = "none";
        count.style.display = 'flex';
        progressBarElement.style.display = 'block';
        // console.log(datetime);
        // SAVE INTO A VARIABLE TO BE ABLE TO STOP WITH CLEARINTERVAL LATER
        interval = setInterval(countdown, refreshTime);

        // PROGRESS BAR
        // console.log(secondsTotal);
        secondsCurrent = 0;
        clearInterval(interval2);
        interval2 = setInterval(progressBar, 100);
    }
}

// REFRESH TIME CONFIG

refreshElement.addEventListener('input', function () {
    refreshTime = refreshElement.value;
    // console.log(refreshTime);
    clearInterval(interval);
    start();
}, false);

// COUNTDOWN
function countdown() {
    endDate = new Date(datetime);
    // console.log(endDate);

    currentDate = new Date();
    // console.log(currentDate);

    totalSeconds = (endDate - currentDate);

    if (totalSeconds >= 0) {
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
    } else {
        countFinished();
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// PROGRESS BAR
function progressBar() {

    // EACH X MILLISECONDS, VAR += X MILLISECONDS
    secondsCurrent += 100;
    // console.log("secondsCurrent: " + secondsCurrent);

    // console.log(difference);

    var percentage = secondsCurrent / difference * 100;
    // console.log(percentage);

    if (percentage <= 100) {

        progressElement.style.width = percentage + "%";

        let decimals;

        if (difference <= 10000) { // < 10 SECONDS
            decimals = percentage.toFixed(0);
        } else if (difference > 10000 && difference <= 60000) { // < 1 MINUTE
            decimals = percentage.toFixed(1);
        } else if (difference > 60000 && difference <= 600000) { // < 10 MINUTES
            decimals = percentage.toFixed(2);
        } else if (difference > 600000 && difference <= 3600000) { // < 1 HOUR
            decimals = percentage.toFixed(3);
        } else if (difference > 3600000 && difference <= 86400000) { // > 1 HOUR
            decimals = percentage.toFixed(4);
        } else if (difference > 86400000 && difference <= 2592000000) { // > 1 DAY
            decimals = percentage.toFixed(5);
        } else if (difference > 2592000000 && difference <= 31104000000) { // > 30 DAYS
            decimals = percentage.toFixed(6);
        } else if (difference > 31104000000 && difference <= 311040000000) { // > 1 YEAR
            decimals = percentage.toFixed(7);
        } else { // > 10 YEARS
            decimals = percentage.toFixed(8);
        }

        percentageElement.innerHTML = decimals + " %";
    }
}

// COUNT FINISHED
function countFinished() {
    error.style.display = "block";
    error.innerHTML = "the count has ended!";
}