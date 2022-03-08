function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Form fields validation
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const nameRegex =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u; 
const emailValid = document.getElementById("email");
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const messageSend = document.getElementById("message");

// Input recovery (for change color border)
const inputFirstName = document.getElementById("first");
const inputLastName = document.getElementById("last");
const inputEmailValid = document.getElementById("email");

// Recovery of label errors
const errorLabelFirst = document.getElementById("errorLabelFirst");
const errorLabelLast = document.getElementById("errorLabelLast");
const errorLabelMail = document.getElementById("errorLabelMail");

//Declaration of check functions for each input
function checkFirstNameValidity () {
    if (!firstName.value || firstName.value.length < 2 || (!nameRegex.test(firstName.value))) {
      errorLabelFirst.style.display = "block";
      inputFirstName.style.borderColor = "red"; 
      return false; 
    } else {
      errorLabelFirst.style.display = "none";
      inputFirstName.style.borderColor = "#ccc"; 
      return true; 
    }
  }
  
  function checkLastNameValidity () {
    if (!lastName.value || lastName.value.length < 2 || (!nameRegex.test(lastName.value))) {
      errorLabelLast.style.display = "block";
      inputLastName.style.borderColor = "red"; 
      return false;
    } else {
      errorLabelLast.style.display = "none";
      inputLastName.style.borderColor = "#ccc"; 
      return true; 
    }
  }
  
  function checkEmailValidity () {
    if (!emailRegex.test(emailValid.value)) {
      errorLabelMail.style.display = "block";    
      inputEmailValid.style.borderColor = "red"; 
      return false;
    } else {
      errorLabelMail.style.display = "none";
      inputEmailValid.style.borderColor = "#ccc"; 
      return true; 
    }
  }

// Initialization of event changes
// First x Last name check 
firstName.addEventListener('change', checkFirstNameValidity);
lastName.addEventListener('change', checkLastNameValidity);
// Email check
emailValid.addEventListener('change', checkEmailValidity);

// Check all form fields
function validateForm() {
    event.preventDefault();
    let isValidForm = true;

  //Names check (firstName x lastName)
  isValidForm = checkFirstNameValidity();
  isValidForm = checkLastNameValidity();
  // Email check
  isValidForm = checkEmailValidity();
}

// Send form x empty it
function sendForm() { 
  const closeConfirmButton = document.getElementById('closeForm');
  closeConfirmButton.addEventListener("click", function () {
  confW.style.display = "none";
  });
}

document.getElementById("contact_modal").addEventListener("submit", function () {
  if (validateForm()) {
    sendForm(); 
    document.getElementById("contact_modal").reset();
    closeModal();
  }
})

/**
	 * Send form with inputs values in the console
	 */
 if (closeForm) {
  closeForm.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(
      `L'utilisateur ${firstName.value} ${lastName.value} avec l'adresse mail suivante ${EmailValid.value} vous adresse le message suivant : ${messageSend.value}`
    );
    modal.style.display = "none";
  });
}