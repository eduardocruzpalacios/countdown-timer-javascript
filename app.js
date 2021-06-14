// CONSTANTS & VARIABLES
const cajaInput = document.getElementById('setup');

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

var interval;
var refreshElement;
var refreshTime = 1;

const progressBarElement = document.getElementById('progressBar');
const porcentajeElement = document.getElementById('porcentaje');
var progressElement = document.getElementById('progress');
var fechaInicial;
var fechaFinal;
var segundosTotales;
var segundosActuales = 0;

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
    cajaInput.appendChild(button);
}

function setLabel(text) {
    const label = document.createElement('label');
    label.innerHTML = text;
    cajaInput.appendChild(label);
}

if (checkInput('datetime-local')) {
    // LABEL
    setLabel('Pick the date and time you wish:');
    // INPUT DATETIME-LOCAL
    const dateTimeLocal = document.createElement('input');
    dateTimeLocal.setAttribute('type', 'datetime-local');
    dateTimeLocal.setAttribute('id', 'datetime');
    cajaInput.appendChild(dateTimeLocal);
    // BUTTON
    setButton();
} else if (checkInput('date') && checkInput('time')) {
    // LABEL
    setLabel('Date:');
    // INPUT DATE
    const date = document.createElement('input');
    date.setAttribute('type', 'date');
    date.setAttribute('id', 'date');
    cajaInput.appendChild(date);
    // LABEL
    setLabel('Time:');
    // INPUT TIME
    const time = document.createElement('input');
    time.setAttribute('type', 'time');
    time.setAttribute('id', 'time');
    time.setAttribute('value', '00:00');
    cajaInput.appendChild(time);
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
    now = new Date();
    const difference = (end - now);
    // console.log(difference);

    // VALIDATE SELECTED DATE BY USER (16 is the datetime format length)
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
        fechaFinal = new Date(datetime);
        fechaInicial = new Date();
        segundosTotales = (fechaFinal - fechaInicial);
        // console.log(segundosTotales);
        setInterval(progressBar, 100);
    }
}

// REFRESH TIME CONFIG

refreshElement = document.getElementById('refresh');

refreshElement.addEventListener('input', function () {
    refreshTime = refreshElement.value;
    // console.log(refreshTime);
    clearInterval(interval);
    start();
}, false);

// IT TRIGGERS WHEN START BUTTON IS CLICKED
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

// PROGRESS BAR
function progressBar() {
    // cada 100 milisegundos, variable aumenta 100 milisegundos
    segundosActuales += 100;
    // console.log("segundosActuales: " + segundosActuales);
    // console.log("segundosTotales: " + segundosTotales);
    var porcentaje = segundosActuales / segundosTotales * 100;
    // console.log(porcentaje);
    progressElement.style.width = porcentaje + "%";
    porcentajeElement.innerHTML = porcentaje;
}