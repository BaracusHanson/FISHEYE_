const modal = document.getElementById("contact_modal");
modal.addEventListener("click", () => {
  displayModal;
});
function displayModal() {
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Gérer la soumission du formulaire
document
  .getElementById("contact_form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêcher l'envoi du formulaire

    // Récupéreration les données du formulaire
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Formulaire soumis avec les données suivantes :");
    console.log("Prénom : " + firstName);
    console.log("Nom : " + lastName);
    console.log("Email : " + email);
    console.log("Message : " + message);

    // Fermeture la modale après la soumission
    closeModal();
  });
