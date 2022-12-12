"use strict";

const btn = document.querySelector(".menu-button");

console.log(btn);
btn.onclick = function () {
  btn.classList.toggle(".js-menu-button");
};
