"use strict";
// * Variables needed to execute code below
const span = document.querySelector(".span");
const body = document.querySelector("body");
const result = document.querySelector(".result");
const buttonsCalc = document.querySelectorAll(".button--calc");
const buttonsMethod = document.querySelectorAll(".button--method");
const prefix = document.querySelector(".prefix");
const buttonSum = document.querySelector(".button--sum");
const buttonDelete = document.querySelector("#del");
const buttonReset = document.querySelector("#reset");
const buttonDot = document.querySelector(".button--dot");
const toggles = document.querySelector(".toggles");

// ? Adding default body class for basic site theme
body.classList.add("theme--1");

// ! Toggle button set up + changing themes
toggles.addEventListener("click", function (e) {
  if (e.target.classList.contains("toggle")) {
    span.classList.remove("span--1", "span--2", "span--3");
    body.classList.remove("theme--1", "theme--2", "theme--3");
    span.classList.add(`span--${e.target.dataset.number}`);
    body.classList.add(`theme--${e.target.dataset.number}`);
  }
});

// ! Calculator settings

let prevNumber = "",
  currentNumber = "",
  method = "",
  resultFinal = 0;

const displayResult = function () {
  result.textContent = resultFinal.toFixed(2).replace(/[.]00$/, "");
  prevNumber = resultFinal.toFixed(2).replace(/[.]00$/, "");
  currentNumber = "";
};

// ? Reset function
const resetCalc = function () {
  prevNumber = "";
  currentNumber = "";
  method = "";
  resultFinal = 0;
  prefix.textContent = "";
  result.textContent = "";
};

const addingNumbers = function () {
  buttonsCalc.forEach((btn) =>
    btn.addEventListener("click", function () {
      currentNumber += btn.textContent;

      // * Adding dot when starting calculation from 0.
      if (+currentNumber[0] === 0 && currentNumber.length < 2) {
        currentNumber += ".";
      }
      result.textContent = currentNumber;
    })
  );
};
addingNumbers();

const addingMethods = function () {
  buttonsMethod.forEach((btn) =>
    btn.addEventListener("click", function () {
      // * Mechanism when starting calculating with method (+,-,/,*).
      if (!prevNumber) {
        prevNumber = currentNumber;
        result.textContent = "";
        currentNumber = "";
      }

      // * Calculating result when both - prev and current number are set.
      if (prevNumber && currentNumber) {
        SumUp(method);
      }
      method = btn.textContent;
      prefix.textContent = `${prevNumber} ${method}`;
    })
  );
};
addingMethods();

// * Using switch to make calculation, then displaying it.
const SumUp = function (m) {
  switch (m) {
    case "+":
      resultFinal = +prevNumber + +currentNumber;
      break;
    case "-":
      resultFinal = +prevNumber - +currentNumber;
      break;
    case "/":
      resultFinal = +prevNumber / +currentNumber;
      break;
    case "x":
      resultFinal = +prevNumber * +currentNumber;
      break;
    default:
      result.textContent = "Error";
  }
  displayResult();
};

// ! Button <equal to>
buttonSum.addEventListener("click", function () {
  SumUp(method);
  // * Clearing prefix area only when using this button.
  prefix.textContent = "";
});

// ! Button DEL - normally delete 1 last digit, but when there is no current number then works as reset.
buttonDelete.addEventListener("click", function () {
  if (currentNumber) {
    currentNumber = currentNumber.slice(0, -1);
    result.textContent = currentNumber;
  } else {
    resetCalc();
  }
});
// ! Button RESET
buttonReset.addEventListener("click", resetCalc);

// ! Button dot
buttonDot.addEventListener("click", function () {
  // * No action when dot already used.
  if (currentNumber.includes(".")) return;
  // * When start with dot - puts 0 before.
  if (!currentNumber) currentNumber = "0.";
  else {
    currentNumber += ".";
  }
  // * Showing result.
  result.textContent = currentNumber;
});
