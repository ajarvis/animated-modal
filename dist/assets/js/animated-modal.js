// Open modal based on data-modal attribute
function openModal(element) {

  var modalID = element.getAttribute('data-modal');  // Get modal data attribute from clicked button
  var modalTarget = document.getElementById(modalID); 
  var modalBackdrop = document.getElementById('modal-backdrop');

  modalTarget.classList.remove("slide-out-top");
  modalTarget.classList.add("is-active", "slide-in-top");
  modalBackdrop.style.display = "block";

  // after delay, remove intro animation
  setTimeout(function () {
    modalTarget.classList.remove("slide-in-top");
  }, 300);

  // Close modal when window is clicked
  window.onclick = function (event) {
    if (event.target == modalTarget) {
      closeModal(modalTarget)
    }
  }

  // Close modal on escape keypress
  document.onkeydown = function (event) {
    event = event || window.event;
    var isEscape = false;
    if ("key" in event) {
      isEscape = (event.key == "Escape" || event.key == "Esc");
    } else {
      isEscape = (event.keyCode == 27);
    }
    if (isEscape) {
      closeModal(modalTarget);
    }
  };

}

// Close modal
function closeModal(element, event) {
  var event = event;
  var modalBackdrop = document.getElementById('modal-backdrop');

  if (element) {
    var modalTarget = element;
  } else {
    var modalTarget = this.getClosest(event.target, ".c-modal");
  }

  modalTarget.classList.remove("slide-in-top");
  modalTarget.classList.add("slide-out-top");
  modalBackdrop.style.display = "none";
  document.body.classList.remove('c-modal-open');
  
  // after delay, remove animation and is-active
  setTimeout(function () {
    modalTarget.classList.remove("slide-out-top", "is-active");
  }, 300);

}

// Find the closest element by given selector
var getClosest = function (elem, selector) {

  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) { }
        return i > -1;
      };
  }

  // Get closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};