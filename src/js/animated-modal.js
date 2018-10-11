/**
 * DEFAULT OPTIONS
 */
var defaults = ({
  introAnimation: "slide-in-top", 
  exitAnimation: "slide-out-top",
  cancelAnimation: "slide-out-bottom",
  confirmAnimation: "slide-out-top",
  activeClass: "is-active",
  closeOnOutsideClick: true,
  closeOnEscape: true,
});

// Open modal based on data-modal attribute
function openModal(element, id) {

  // Set element targets based on data-modal attribute
  if (id) {
    var modalTarget = id;
    
  } else {
    var modalID = element.getAttribute('data-modal');
    var modalTarget = document.getElementById(modalID); 
    
  }
  
  var modalBackdrop = document.getElementById('modal-backdrop'); 

  // Get and set options from the data-modal-options attribute
  var options = getDataOptions(element ? element.getAttribute('data-modal-options') : null);

  // Merge user options with defaults
  var settings = mergeOptions(defaults, options);

  // Show the modal, backdrop, and apply animation
  modalTarget.classList.add(settings.introAnimation, settings.activeClass);
  modalBackdrop.style.display = 'block';

  // Close modal when clicking outside of the modal
  if (settings.closeOnOutsideClick == true) {
    window.onclick = function (event) {
      if (event.target == modalTarget) {
        if (id) {
          closeModal(element, id);
        } else {
          closeModal(element)
        }
      }
    }
  }

  // Close modal on escape key press
  if (settings.closeOnEscape == true) {
    document.onkeydown = function (event) {
      event = event || window.event;
      var isEscape = false;
      if ('key' in event) {
        isEscape = (event.key == 'Escape' || event.key == 'Esc');
      } else {
        isEscape = (event.keyCode == 27);
      }
      if (isEscape) {
        if (id) {
          closeModal(element, id);
        } else {
          closeModal(element)
        }
      }
    };
  }

  // Check for animation end and call introAnimationCompleted() function when animations stop
  checkForAnimationEnd(modalTarget, "AnimationEnd", introAnimationCompleted);

  // Remove exit animation classes and show the modal
  function introAnimationCompleted() {
    modalTarget.classList.remove(settings.introAnimation);
    modalTarget.classList.add(settings.activeClass);
  }
}

function cancelModal(element, id) {
  var action = "cancel";
  closeModal(element, id, action);
}

function confirmModal(element, id) {
  var action = "confirm";
  closeModal(element, id, action);
}


// Closes the modal when passed an element id through data-attribute
// Expects the use for `data-modal="id"` where id is the modal target
function closeModal(element, id, action) {

  // Set element targets based on data-modal attribute
  if (id) {
    var modalTarget = id; 
  } else {
    var modalID = element.getAttribute('data-modal');
    var modalTarget = document.getElementById(modalID);
  }

  // Sets variables for target elements
  var modalBackdrop = document.getElementById('modal-backdrop');

  // Get and set options from the data-modal-options attribute
  var options = getDataOptions(element ? element.getAttribute('data-modal-options') : null);

  // Merge user options with defaults
  var settings = mergeOptions(defaults, options);

  // Set the exit animation based on defaults or called functions
  var exitAnimation = settings.exitAnimation;
  // if cancelModal() called, apply cancel animation
  if (action == "cancel") {
    var exitAnimation = settings.cancelAnimation;
  // if confirmModal() called, apply confirm animation
  } else if (action == "confirm") {
    var exitAnimation = settings.confirmAnimation;
  }

  modalTarget.classList.add(exitAnimation);
  modalBackdrop.style.display = 'none';

  // Check for animation end and call exitAnimationCompleted() function when animations stop
  checkForAnimationEnd(modalTarget, "AnimationEnd", exitAnimationCompleted);

  // Remove exit animation classes and hide the modal
  function exitAnimationCompleted() {
    modalTarget.classList.remove(exitAnimation, settings.activeClass);
  }

}


  //
	// Utility Functions
	//

  /**
   * Merges two or more objects and returns a new object.
   * mergeOptions(object, object) - Returns merged oject
   */
  function mergeOptions() {
    var mergedOptions = {};

    // Merge the object into the extended object (mergedOptions)
    function merge(object) {
      for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
          mergedOptions[prop] = object[prop];
        }
      }
    };

    // Loop through each object and merge
    for (var i = 0; i < arguments.length; i++) {
      merge(arguments[i]);
    }

    return mergedOptions;
  };


  /**
   * Gets data options from data-modal-options attribute
   * Converts options to an object
   */
  function getDataOptions(options) {
    return (!options || typeof JSON.parse !== 'function') ? {} : JSON.parse(options);
  };


  /**
   * Check for animation end
   * Loop through prefixes for browser animationend variations
   * Add event listener on passed element
   */
  var prefix = ["webkit", "moz", "MS", "o", ""];

  function checkForAnimationEnd(element, type, callback) {
    for (var p = 0; p < prefix.length; p++) {
      if (!prefix[p]) type = type.toLowerCase();
      element.addEventListener(prefix[p]+type, callback, false);
    }
  }