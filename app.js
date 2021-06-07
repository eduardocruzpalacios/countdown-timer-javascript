const decadesElement = document.getElementById("decades");
const yearsElement = document.getElementById("years");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

const endDateString = "16 May 2092";

function countdown() {
    const endDate = new Date(endDateString);
    const currentDate = new Date();

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
    decadesElement.innerHTML = decades;
    yearsElement.innerHTML = years;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1);