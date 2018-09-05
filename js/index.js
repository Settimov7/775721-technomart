var buttonWriteUs = document.querySelector(".main_contacts .button");
var popupWriteUs = document.querySelector(".write_us");
var formWriteUs = popupWriteUs.querySelector(".form_write_us");
var closeWriteUs = popupWriteUs.querySelector(".modal_close");
var nameField = formWriteUs.querySelector(".form_field[type = text]");
var emailField = formWriteUs.querySelector(".form_field[type = email]");
var messageField = formWriteUs.querySelector("textarea");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

var buttonMap = document.querySelector(".main_contacts img");
var popupMap = document.querySelector(".map");
var closeMap = popupMap.querySelector(".modal_close");

var buttonsBuy = document.querySelectorAll(".product .buy");
var popupCartSucces = document.querySelector(".cart_success");
var closeCartSucces = popupCartSucces.querySelector(".modal_close");

var cart = document.querySelector(".shopping_cart");
var productsCount = 0;

var mainSlider = document.querySelector(".main_slider");
var allMainSlides = mainSlider.querySelectorAll(".slide");
var buttonNextSlide = mainSlider.querySelector(".button_next");
var buttonPreviousSlide = mainSlider.querySelector(".button_back");
var sliderNavigationPoints = mainSlider.querySelectorAll(".slider_navigation_point");
var currentSlideIndex = 0;

var servicesSlider = document.querySelector(".services_slider");
var allservicesSlides = servicesSlider.querySelectorAll(".description_slide");
var servicesNavigation = servicesSlider.querySelector(".services_list");
var servicesNavigationItems = servicesNavigation.querySelectorAll(".item");
var currentServicesSlideIndex = 0;

// Шаги алгоритма ECMA-262, 6-е издание, 22.1.2.1
// Ссылка: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // Свойство length метода from равно 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Положим C равным значению this.
      var C = this;

      // 2. Положим items равным ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. Если mapfn равен undefined, положим mapping равным false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. иначе
        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Положим lenValue равным Get(items, "length").
      // 11. Положим len равным ToLength(lenValue).
      var len = toLength(items.length);

      // 13. Если IsConstructor(C) равен true, то
      // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
      //     объекта C со списком аргументов, содержащим единственный элемент len.
      // 14. a. Иначе, положим A равным ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Положим k равным 0.
      var k = 0;
      // 17. Пока k < len, будем повторять... (шаги с a по h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Положим putStatus равным Put(A, "length", len, true).
      A.length = len;
      // 20. Вернём A.
      return A;
    };
  }());
}

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

buttonWriteUs.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupWriteUs.classList.add("modal_show")

  if (storageName) {
    nameField.value = storageName;
    emailField.value = storageEmail;
    messageField.focus();
  } else {
    nameField.focus();
  }
});

closeWriteUs.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupWriteUs.classList.remove("modal_show");
  popupWriteUs.classList.remove("modal_error");
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupWriteUs.classList.contains("modal_show")) {
      popupWriteUs.classList.remove("modal_show");
      popupWriteUs.classList.remove("modal_error");
    }

    if (popupMap.classList.contains("modal_show")) {
      popupMap.classList.remove("modal_show");
    }

    if (popupCartSucces.classList.contains("modal_show")) {
      popupCartSucces.classList.remove("modal_show");
    }
  }
});

formWriteUs.addEventListener("submit", function(evt) {
  if (!nameField.value || !emailField.value) {
    evt.preventDefault();
    popupWriteUs.classList.remove("modal_error");
    popupWriteUs.offsetWidth = popupWriteUs.offsetWidth;
    popupWriteUs.classList.add("modal_error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameField.value);
      localStorage.setItem("email", emailField.value);
    }
  }
});

buttonMap.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupMap.classList.add("modal_show");
});

closeMap.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupMap.classList.remove("modal_show");
});

for (var i = 0; i < buttonsBuy.length; i++) {
  buttonBuy = buttonsBuy[i];
  buttonBuy.addEventListener("click", function(evt) {
    evt.preventDefault(); 
    popupCartSucces.classList.add("modal_show");
    productsCount++;
    cart.innerHTML = 'Корзина: ' + productsCount;
    cart.classList.add("active");
  });
}

closeCartSucces.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupCartSucces.classList.remove("modal_show");
});

function nextSlide () {
  goToSlide(currentSlideIndex + 1);
}

function previousSlide () {
  goToSlide(currentSlideIndex - 1);
}

function goToSlide (currentSlide) {
  allMainSlides[currentSlideIndex].classList.remove("active");
  sliderNavigationPoints[currentSlideIndex].classList.remove("active");
  currentSlideIndex = (currentSlide + allMainSlides.length) % allMainSlides.length;
  allMainSlides[currentSlideIndex].classList.add("active");
  sliderNavigationPoints[currentSlideIndex].classList.add("active");
}

buttonNextSlide.addEventListener("click", function(evt) {
  evt.preventDefault();
  nextSlide();
});

buttonPreviousSlide.addEventListener("click", function(evt) {
  evt.preventDefault();
  previousSlide();
});

for (var i = 0; i < sliderNavigationPoints.length; i++) {
  sliderNavigationPoints[i].addEventListener("click" , function(evt) {
    evt.preventDefault();
    allMainSlides[currentSlideIndex].classList.remove("active");
    sliderNavigationPoints[currentSlideIndex].classList.remove("active");
    currentSlideIndex = parseInt(evt.target.innerText) - 1;
    allMainSlides[currentSlideIndex].classList.add("active");
    sliderNavigationPoints[currentSlideIndex].classList.add("active");
  });
}

for (var i = 0; i < servicesNavigationItems.length; i++) {
  servicesNavigationItems[i].addEventListener("click", function(evt) {
    evt.preventDefault();

    var indexClick = Array.from(servicesNavigationItems).indexOf(evt.target);

    allservicesSlides[currentServicesSlideIndex].classList.remove("active");
    servicesNavigationItems[currentServicesSlideIndex].classList.remove("current");
    currentServicesSlideIndex = indexClick;
    allservicesSlides[currentServicesSlideIndex].classList.add("active");
    servicesNavigationItems[currentServicesSlideIndex].classList.add("current");
  });
}







