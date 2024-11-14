async function getPhotographers() {
  try {
    let response = await fetch("../data/photographers.json");
    if (!response.ok) throw new Error("Erreur lors du chargement des données.");
    const photographers = await response.json();
    return photographers;
  } catch (error) {
    alert("Les données des photographes n'ont pas pu être chargées.");
    return null;
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    // Crée un lien pour chaque photographe
    const photographerLink = document.createElement("a");
    photographerLink.href = `photographer.html?id=${photographer.id}`;
    photographerLink.setAttribute("aria-label", `Voir la page de ${photographer.name}`);
    photographerLink.appendChild(userCardDOM);
    photographersSection.appendChild(photographerLink);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
