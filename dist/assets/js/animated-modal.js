// Open modal based on data-modal attribute
function openModal(element) {

  var modalID = element.getAttribute('data-modal');  // Get modal data attribute from clicked button
  var modalTarget = document.getElementById(modalID); 
  var modalBackdrop = document.getElementById('modal-backdrop');

  modalTarget.classList.remove("slide-out-top"); // remove any applied exit animations
  modalTarget.classList.add("is-active", "slide-in-top"); // add intro animation and show modal
  modalBackdrop.style.display = "block"; // show the backdrop

  // Close modal when window is clicked
  window.onclick = function (event) {
    if (event.target == modalTarget) {
      closeModal(modalTarget)
      console.log("clicked outside modal target");
    }
  }

}


// Close modal
function closeModal(element, event) {
  var event = event;
  var modalBackdrop = document.getElementById('modal-backdrop');

  if (element) { // if element parameter was passed, set the modalTarget to this
    var modalTarget = element;
  } else { // otherwise, just find the closest modal and target it
    var modalTarget = this.getClosest(event.target, ".c-modal");
  }

  modalTarget.classList.remove("slide-in-top");
  modalTarget.classList.add("slide-out-top");
  modalBackdrop.style.display = "none";
  document.body.classList.remove('c-modal-open');
  
  setTimeout(function () {
    modalTarget.style.display = "none"; // hide modal after delay
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