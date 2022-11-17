"use strict";
const span = document.querySelector(".span");
const inputs = document.querySelectorAll("input");
const body = document.querySelector("body");

body.classList.add("theme--1");

inputs.forEach((input, i) =>
  input.addEventListener("click", function (e) {
    span.classList.remove("span--1", "span--2", "span--3");
    body.classList.remove("theme--1", "theme--2", "theme--3");
    span.classList.add(`span--${i + 1}`);
    body.classList.add(`theme--${i + 1}`);
  })
);
