"use strict";
// * Variables needed to execute code below
const span = document.querySelector(".span");
const inputs = document.querySelectorAll("input");
const body = document.querySelector("body");
const result = document.querySelector(".result");
const buttonsCalc = document.querySelectorAll(".button--calc");
const buttonsMethod = document.querySelectorAll(".button--method");
const prefix = document.querySelector(".prefix");
const buttonSum = document.querySelector(".button--sum");
const buttonDelete = document.querySelector("#del");
const buttonReset = document.querySelector("#reset");
const buttonDot = document.querySelector(".button--dot");

// ? Adding default body class for basic site theme
body.classList.add("theme--1");

// ! Toggle button set up + changing themes
inputs.forEach((input, i) =>
  input.addEventListener("click", function () {
    span.classList.remove("span--1", "span--2", "span--3");
    body.classList.remove("theme--1", "theme--2", "theme--3");
    span.classList.add(`span--${i + 1}`);
    body.classList.add(`theme--${i + 1}`);
  })
);

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
      if (!prevNumber) {
        prevNumber = currentNumber;
        result.textContent = "";
        currentNumber = "";
      }
      if (prevNumber && currentNumber) {
        SumUp(method);
      }
      method = btn.textContent;
      prefix.textContent = `${prevNumber} ${method}`;
    })
  );
};
addingMethods();

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

buttonSum.addEventListener("click", function () {
  SumUp(method);
  prefix.textContent = "";
});

buttonDelete.addEventListener("click", function () {
  if (currentNumber) {
    currentNumber = currentNumber.slice(0, -1);
    result.textContent = currentNumber;
  } else {
    resetCalc();
  }
});

buttonReset.addEventListener("click", resetCalc);

buttonDot.addEventListener("click", function () {
  if (currentNumber.includes(".")) return;
  if (!currentNumber) currentNumber = "0.";
  else {
    currentNumber += ".";
  }
  result.textContent = currentNumber;
});
