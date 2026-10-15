"use strict"

// true userpass:
const userName = 'amirali';
const password = 'modaresi';

const squirsArr = [
    document.querySelector('.leftGreenDiv'),
    document.querySelector('.redDiv'),
    document.querySelector('.leftYellowDiv'),
    document.querySelector('.rightYellowDiv'),
    document.querySelector('.blueDiv'),
    document.querySelector('.rightGreenDiv')
]
const primaryColors = [
    'rgb(138, 201, 38, 0.7)',
    '#ff595e',
    'rgb(255, 202, 58, 0.7)',
    'rgb(255, 202, 58, 0.7)',
    '#1982c4',
    'rgb(138, 201, 38, 0.7)'
]
const redWarnColors = [
    '#e22844',
    '#b31f30',
    '#da4352',
    '#ff2c41',
    '#a4183b',
    '#dd4453'
]
const greenWarnColors = [
    '#5bba6f',
    '#007200',
    '#59ea67',
    '#7ed289',
    '#137547',
    '#34cd55'
]

const leftSide = document.querySelector('.leftSide');
const rightSide = document.querySelector('.rightSide');
const center = document.querySelector('.center');
const successTextElem = document.querySelector('.successText')
const btn = document.querySelector('.submitBtn');

const alertDiv = document.querySelector('.alert');
const alertText = document.querySelector('.alertText');

// user input:
const inputUserName = document.querySelector('#userNameInput');
const inputPassword = document.querySelector('#passInput');

// load animation:
addEventListener("load", () => {
    leftSide.style.left = '-20%';
    rightSide.style.right = '-20%';
    setTimeout(() => {
        center.style.opacity = '1';
    }, 300);
})

// as the html doesnt provide a <form>!:
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

// input check:
btn.addEventListener("click", () => {
    if (inputUserName.value.trim() === "" || inputPassword.value.trim() === "") {
        // empty userpass
        // zoom animation:
        leftSide.style.transition = '0.3s ease';
        rightSide.style.transition = '0.3s ease';
        leftSide.style.left = '-15%';
        rightSide.style.right = '-15%';
        setTimeout(() => {
            leftSide.style.left = '-20%';
            rightSide.style.right = '-20%';
        }, 200);

        messageAlert("Fill in the blanks", "#fff265");

    } else if (inputUserName.value === userName && inputPassword.value === password) {
        // true userpass
        colorAlert(greenWarnColors);
        messageAlert("Login successful", "#8deca2");

    } else {
        // false userpass
        colorAlert(redWarnColors);
        messageAlert("Wrong input! Try again.", "#ff5a65");
    }
})

let isColorAlertRunning = false;
function colorAlert(arrayName) {
    if (isColorAlertRunning) return;

    isColorAlertRunning = true;

    const totalSteps = squirsArr.length * 2;
    let colorCounter = 0;

    let inter = setInterval(() => {
        // 12 is the color counter after the colors change back to normal.
        if (colorCounter >= totalSteps) {
            clearInterval(inter);
            isColorAlertRunning = false;
            return;
        } else if (colorCounter < squirsArr.length) {
            squirsArr[colorCounter].style.backgroundColor = arrayName[colorCounter];
            colorCounter++;
        } else {
            // -6 is to get the index right although the color counter is more than 6
            // the lenght of all arrays are 6
            squirsArr[(colorCounter - 6)].style.backgroundColor = primaryColors[(colorCounter - 6)];
            colorCounter++;
        }

    }, 100);
}

function messageAlert(text, color) {
    alertText.textContent = text;
    alertDiv.style.backgroundColor = color;
    alertDiv.style.opacity = '1';
    alertDiv.style.bottom = '-30px';
    setTimeout(() => {
        alertDiv.style.bottom = '0px';
        alertDiv.style.opacity = '0';
    }, 2000);
}