//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from "./index.js";
import { photographerTemplate } from "../templates/photographer.js";

// Afficher le profil du photographe
export async function displayPhotographerData() {
  // Récupérer l'ID du photographe depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("id"), 10);
  //   console.log(photographerId);

  // Charger les données des photographes
  const datas = await getPhotographers();

  if (!datas) {
    alert("Aucune donnée de photographe trouvée.");
    return;
  }

  // Trouver le photographe correspondant à l'ID
  const photographer = datas.photographers.find(
    (item) => item.id === photographerId
  );

  if (!photographer) {
    // alert("Photographe introuvable.");
    return;
  }

  // Affichage des informations du photographe dans la page
  const photographerHeaderInfos = document.querySelector(
    ".photograph-header-infos"
  );
  const photographerHeaderImage = document.querySelector(
    ".photograph-header-image"
  );

  // Affichage des informations nom location tagline du photographe dans le DOM
  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardHeaderInfos();
  photographerHeaderInfos.appendChild(userCardDOM);

  // Affichage de l image du photograph dans le DOM
  const photographerModelImage = photographerTemplate(photographer);
  const userCardDOMImage = photographerModelImage.getUserCardHeaderImage();
  photographerHeaderImage.appendChild(userCardDOMImage);
}

displayPhotographerData();

// gestion Affichage des medias du photograph dans la page details 
export function displayPhotographerMedia(medias) {
  const photographerMedia = document.querySelector(".articleSection");

  medias.forEach((media) => {
    const mediaModel = photographerTemplate(media);
    const mediaCard = mediaModel.createMediaCard();
    photographerMedia.appendChild(mediaCard);
  });
}

