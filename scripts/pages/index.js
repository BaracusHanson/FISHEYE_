import { photographerTemplate } from "../templates/photographer.js";
import { displayPhotographerMedia, openLightBox } from "./photographer.js";

export async function getPhotographers() {
  try {
    let response = await fetch("/data/photographers.json");
    if (!response.ok) throw new Error("Erreur lors du chargement des données.");
    const photographers = await response.json();

    return photographers;
  } catch (error) {
    throw new Error(
      "Les données des photographes n'ont pas pu être chargées.",
      error
    );
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    photographersSection?.appendChild(userCardDOM);

    // Crée un lien pour chaque photographe
    const photographerLink = document.createElement("a");
    photographerLink.href = `photographer.html?id=${photographer.id}`;
    photographerLink.setAttribute(
      "aria-label",
      `Voir la page de ${photographer.name}`
    );
    photographerLink.appendChild(userCardDOM);
    photographersSection?.appendChild(photographerLink);
  });
}

async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("id"), 10);

  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { media } = await getPhotographers();
  const photographerMedia = media.filter(
    (m) => m.photographerId === photographerId
  );
  // console.log(photographerMedia);
  displayData(photographers);

  displayPhotographerMedia(photographerMedia);
  openLightBox(media);
  // Envoyer photographerMedia comme paramètre à handleLikes
  const sendMediaToHandleLikes = photographerTemplate(photographerMedia);
  sendMediaToHandleLikes.handleLikes(photographerMedia);
}

init();
