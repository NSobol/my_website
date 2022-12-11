"use strict";

function Ant() {
  this.crslRoot = document.querySelector(".ant-carousel");

  // Carousel objects
  this.crslList = this.crslRoot.querySelector(".ant-carousel-list");
  this.crslElements = this.crslList.querySelectorAll(".ant-carousel-element");
  this.crslElemFirst = this.crslList.querySelector(".ant-carousel-element");

  // Initialization
  this.options = Ant.defaults;
  Ant.initialize(this);
}

Ant.defaults = {
  // Default options for the carousel
  elemVisible: 4, // Кол-во отображаемых элементов в карусели
  loop: true, // Бесконечное зацикливание карусели
  auto: true, // Автоматическая прокрутка
  interval: 4000, // Интервал между прокруткой элементов (мс)
  speed: 650, // Скорость анимации (мс)
};

Ant.prototype.elemNext = function (num) {
  num = num || 1;
  this.currentElement += num;

  if (this.options.loop) {
    // сдвиг влево с циклом
    let elm,
      buf,
      this$ = this;
    this.crslList.style.cssText =
      "transition:margin " + this.options.speed + "ms ease;";
    this.crslList.style.marginLeft = "-" + this.elemWidth * num + "px";
    setTimeout(function () {
      this$.crslList.style.cssText = "transition:none;";
      for (let i = 0; i < num; i++) {
        elm = this$.crslList.firstElementChild;
        buf = elm.cloneNode(true);
        this$.crslList.appendChild(buf);
        this$.crslList.removeChild(elm);
      }
      this$.crslList.style.marginLeft = "0px";
    }, this.options.speed);
  }
};

Ant.initialize = function (that) {
  // Constants
  that.elemCount = that.crslElements.length; // Количество элементов
  that.dotsVisible = that.elemCount; // Число видимых точек
  let elemStyle = window.getComputedStyle(that.crslElemFirst);
  that.elemWidth =
    that.crslElemFirst.offsetWidth + // Ширина элемента (без margin)
    parseInt(elemStyle.marginLeft) +
    parseInt(elemStyle.marginRight);

  // Variables
  that.currentElement = 0;
  that.currentOffset = 0;
  that.touchPrev = true;
  that.touchNext = true;
  let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
  let bgTime = getTime();

  // Functions
  function getTime() {
    return new Date().getTime();
  }

  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      let fnTime = getTime();
      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime;
        that.elemNext();
      }
    }, that.options.interval);
  }

  // Start initialization
  if (that.options.auto) {
    // инициализация автопрокруки
    setAutoScroll();
  }
};

new Ant();
