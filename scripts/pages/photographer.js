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
  const photographerMediaContainer = document.querySelector(".articleSection");
  const sortMenu = document.getElementById("sortMenu");

  // Fonction pour réafficher les médias triés ou non triés
  function renderMedia(mediaArray) {
    photographerMediaContainer.innerHTML = ""; // Vider le conteneur
    mediaArray.forEach((media) => {
      const mediaModel = photographerTemplate(media); // Crée un modèle pour chaque média
      const mediaCard = mediaModel.createMediaCard(); // Génère la carte du média
      photographerMediaContainer.appendChild(mediaCard); // Ajoute la carte au DOM
    });
  }

  // Fonction de tri par popularité (likes décroissants)
  function sortByPopularity(mediaArray) {
    return [...mediaArray].sort((a, b) => b.likes - a.likes); // Utilise une copie du tableau
  }

  // Fonction de tri par titre (ordre alphabétique)
  function sortByTitle(mediaArray) {
    return [...mediaArray].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    });
  }

  // Applique le rendu initial sans tri
  renderMedia(medias);

  // Écouteu d'événements pour changer le tri
  sortMenu.addEventListener("change", (event) => {
    const sortOption = event.target.value;

    // Initialise les médias triés avec une copie des médias d'origine
    let sortedMedia = [...medias];

    // Applique le tri selon l'option sélectionnée
    if (sortOption === "popularite") {
      sortedMedia = sortByPopularity(medias);
    } else if (sortOption === "titre") {
      sortedMedia = sortByTitle(medias);
    }

    // Réaffiche les médias (triés ou par défaut)
    renderMedia(sortedMedia);
  });
}



export function openLightBox(media) {
  const articles = document.querySelectorAll(".articleSectionCardImage");
  const lightBox = document.querySelector(".lightBoxContainer");
  const mediaContainer = document.querySelector("#media-container");
  const suivant = document.querySelector("#next");
  const precedent = document.querySelector("#prev");

  // const carrousel = document.querySelector(".lightContainer");

  articles.forEach((article, index) => {
    article.addEventListener("click", (e) => {
      lightBox.classList.remove("hidden");

      // Récupérer les médias du photographe
      const mediaphotographerId = e.currentTarget.getAttribute(
        "data-photographerId"
      );
      const mediasByUser = media.filter((media) => {
        return media.photographerId === parseInt(mediaphotographerId, 10);
      });

      // Initialiser l'index actif à celui de l'élément cliqué
      let currentIndex = index;

      // Fonction pour afficher un média donné dans la Lightbox
      const displayMedia = (index) => {
        const currentMedia = mediasByUser[index];
        if (currentMedia.image) {
          mediaContainer.innerHTML = `
            <img
              class="lithBoxImage"
              src="./assets/photographers/${currentMedia.image}"
              alt="${currentMedia.title}"
            />`;
        } else if (currentMedia.video) {
          mediaContainer.innerHTML = `
            <video
              class="lithBoxImage"
              src="./assets/photographers/${currentMedia.video}"
              controls
              aria-label="${currentMedia.title}"
            ></video>`;
        }

        // Mettre à jour le titre
        document.getElementById("ImageTitle").textContent = currentMedia.title;
      };

      // Afficher le média initial
      displayMedia(currentIndex);

      // Gestion du bouton "suivant"
      suivant.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % mediasByUser.length; // Retourne au début si on dépasse la fin
        displayMedia(currentIndex);
      });

      // Gestion du bouton "précédent"
      precedent.addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + mediasByUser.length) % mediasByUser.length; // Retourne à la fin si on passe en dessous de 0
        displayMedia(currentIndex);
      });
    });
  });
}
function closeLightBox() {
  const lightBox = document.querySelector(".lightBoxContainer");
  const lightBoxCloser = document.querySelector(".closeLightBox");

  lightBoxCloser?.addEventListener("click", () => {
    lightBox.classList.add("hidden");
  });
}
closeLightBox();
