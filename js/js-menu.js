"use strict";
//Находим кнопку, меню и banner
const btn = document.querySelector(".menu-button");
const label = document.querySelector(".menu-button-label");
const menu = document.querySelector(".menu-list");
const banner = document.querySelector(".banner");

btn.onclick = function () {
  btn.classList.toggle("js-menu-button");
  menu.classList.toggle("js-menu-list");
  menu.classList.toggle("menu-list");
  banner.classList.toggle("banner-mobile");
  span.classList.toggle("menu-button-label");
  span.classList.toggle("label-mobile");
};
