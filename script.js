"use strict";
// * Variables needed to execute code below
const span = document.querySelector(".span");
const inputs = document.querySelectorAll("input");
const body = document.querySelector("body");
const result = document.querySelector("#result");
const buttonsCalc = document.querySelectorAll(".button");

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
let calc = 0;

const calculation = function () {
  buttonsCalc.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      const res = btn.textContent;
      result.textContent = res;
    })
  );
};
calculation();
