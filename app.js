// CHECK INPUT IS SUPPORTED BY USER'S BROWSER AND CREATE CORRECT INPUT

window.addEventListener('load', checkWhatInputBrowserSupports);

const inputContainer = document.getElementById('setup');

function checkWhatInputBrowserSupports() {
    if (checkInput('datetimeValue-local')) {
        setLabel('Pick the date and time you wish:');
        const dateTimeValueLocal = document.createElement('input');
        dateTimeValueLocal.setAttribute('type', 'datetimeValue-local');
        dateTimeValueLocal.setAttribute('id', 'datetimeValue');
        inputContainer.appendChild(dateTimeValueLocal);
        setButton();
    } else if (checkInput('date') && checkInput('time')) {
        setLabel('Date:');
        const date = document.createElement('input');
        date.setAttribute('type', 'date');
        date.setAttribute('id', 'date');
        inputContainer.appendChild(date);
        setLabel('Time:');
        const time = document.createElement('input');
        time.setAttribute('type', 'time');
        time.setAttribute('id', 'time');
        time.setAttribute('value', '00:00');
        inputContainer.appendChild(time);
        setButton();
    } else {
        alert('Sorry, your browser does not support this app');
    }
}

function checkInput(type) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    return input.type === type;
}

function setLabel(text) {
    const label = document.createElement('label');
    label.innerHTML = text;
    inputContainer.appendChild(label);
}

function setButton() {
    const button = document.createElement('button');
    button.setAttribute('onclick', 'start()');
    button.setAttribute('id', 'start');
    button.innerHTML = 'Start';
    inputContainer.appendChild(button);
}

// IT TRIGGERS WHEN START BUTTON IS CLICKED

let datetimeValue;
let difference;
const error = document.getElementById('errormsg');
let isRunning = false;
const count = document.getElementById('count');
const progressBarElement = document.getElementById('progressBar');
let interval;
let secondsCurrent = 0;
let interval2;

function start() {
    if (checkInput('datetimeValue-local')) {
        datetimeValue = document.getElementById('datetimeValue').value;
    } else if (checkInput('date') && checkInput('time')) {
        let date = document.getElementById('date').value;
        let time = document.getElementById('time').value;
        datetimeValue = date + 'T' + time;
    }

    const end = new Date(datetimeValue);
    const now = new Date();
    difference = end - now;

    if (
        datetimeValue == '' ||
        datetimeValue == null ||
        datetimeValue.length < 16
    ) {
        error.innerHTML = 'set up a date!';
    } else if (difference <= 0) {
        if (!isRunning) {
            error.innerHTML = 'the end date must be later than now!';
        } else {
            isRunning = false;
        }
    } else {
        isRunning = true;
        error.innerHTML = '';
        error.style.display = 'none';
        count.style.display = 'flex';
        progressBarElement.style.display = 'block';
        interval = setInterval(countdown, refreshTime);
        secondsCurrent = 0;
        clearInterval(interval2);
        interval2 = setInterval(progressBar, 100);
    }
}

let endDate;
let currentDate;
let totalSeconds;
const millisecondsElement = document.getElementById('milliseconds');
const secondsElement = document.getElementById('seconds');
const minutesElement = document.getElementById('minutes');
const hoursElement = document.getElementById('hours');
const daysElement = document.getElementById('days');
const yearsElement = document.getElementById('years');
const decadesElement = document.getElementById('decades');

function countdown() {
    endDate = new Date(datetimeValue);
    currentDate = new Date();
    totalSeconds = endDate - currentDate;

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

function countFinished() {
    clearInterval(interval);
    clearInterval(interval2);
    error.style.display = 'block';
    error.innerHTML = '';
    if (!isRunning) {
        error.innerHTML = 'invalid date selected while isRunning';
        progressBarElement.style.display = 'none';
        count.style.display = 'none';
    } else {
        error.innerHTML = 'the count has ended!';
        progressBarElement.style.display = 'block';
        count.style.display = 'flex';
        isRunning = false;
    }
}

const percentageElement = document.getElementById('percentage');
const progressElement = document.getElementById('progress');

function progressBar() {
    secondsCurrent += 100;
    let percentage = (secondsCurrent / difference) * 100;

    if (percentage <= 100 && secondsCurrent <= difference) {
        progressElement.style.width = percentage + '%';
        let decimals;

        if (difference <= 10000) {
            // < 10 SECONDS
            decimals = percentage.toFixed(0);
        } else if (difference > 10000 && difference <= 60000) {
            // < 1 MINUTE
            decimals = percentage.toFixed(1);
        } else if (difference > 60000 && difference <= 600000) {
            // < 10 MINUTES
            decimals = percentage.toFixed(2);
        } else if (difference > 600000 && difference <= 3600000) {
            // < 1 HOUR
            decimals = percentage.toFixed(3);
        } else if (difference > 3600000 && difference <= 86400000) {
            // > 1 HOUR
            decimals = percentage.toFixed(4);
        } else if (difference > 86400000 && difference <= 2592000000) {
            // > 1 DAY
            decimals = percentage.toFixed(5);
        } else if (difference > 2592000000 && difference <= 31104000000) {
            // > 30 DAYS
            decimals = percentage.toFixed(6);
        } else if (difference > 31104000000 && difference <= 311040000000) {
            // > 1 YEAR
            decimals = percentage.toFixed(7);
        } else {
            // > 10 YEARS
            decimals = percentage.toFixed(8);
        }

        percentageElement.innerHTML = decimals + ' %';
    }
}

// REFRESH PACE

const refreshElement = document.getElementById('refresh');
let refreshTime = 1;

refreshElement.addEventListener(
    'input',
    function () {
        refreshTime = refreshElement.value;
        clearInterval(interval);
        start();
    },
    false
);
