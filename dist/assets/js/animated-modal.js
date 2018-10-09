// Open modal based on data-modal attribute
function openModal(element) {

  var modalID = element.getAttribute('data-modal');  // Get modal data attribute from clicked button
  var modalTarget = document.getElementById(modalID); 
  var modalBackdrop = document.getElementById('modal-backdrop');

  modalTarget.classList.remove("slide-out-top"); // remove any applied exit animations
  modalTarget.classList.add("is-active", "slide-in-top"); // add intro animation and show modal
  modalBackdrop.style.display = "block"; // show the backdrop

}