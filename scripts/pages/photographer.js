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
    // Vider le conteneur

    
    photographerMediaContainer.innerHTML = "";

    mediaArray.forEach((media) => {
      const mediaModel = photographerTemplate(media); // Crée un modèle pour chaque média
      const mediaCard = mediaModel.createMediaCard(); // Génère la carte du média
      photographerMediaContainer.appendChild(mediaCard); // Ajoute la carte au DOM
    });
    // Réattacher les événements après chaque rendu
    openLightBox(mediaArray);
    closeLightBox();
    const likedEventtrigger = photographerTemplate(mediaArray);
    likedEventtrigger.handleLikes(mediaArray);
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

  // Appliquer le rendu initial sans tri

 
  renderMedia(medias);

  // Écouteur d'événements pour changer le tri
  sortMenu.addEventListener("change", (event) => {
    const sortOption = event.target.value;

    // Initialiser les médias triés avec une copie des médias d'origine
    let sortedMedia = [...medias];

    // Appliquer le tri selon l'option sélectionnée
    if (sortOption === "popularite") {
      sortedMedia = sortByPopularity(medias);
    } else if (sortOption === "titre") {
      sortedMedia = sortByTitle(medias);
    }

    // Réafficher les médias (triés ou par défaut)
    renderMedia(sortedMedia);
  });
}

export function openLightBox(media) {
  const articles = document.querySelectorAll(".articleSectionCardImage");
  const lightBox = document.querySelector(".lightBoxContainer");
  const mediaContainer = document.querySelector("#media-container");
  const suivant = document.querySelector("#next");
  const precedent = document.querySelector("#prev");
  const imageTitle = document.getElementById("ImageTitle");

  let currentIndex; // Index actif global pour le média affiché
  let mediasByUser; // Médias spécifiques au photographe

  // Fonction pour afficher un média donné dans la lightbox
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
    imageTitle.textContent = currentMedia.title;
  };

  // Fonction pour fermer la lightbox
  const closeLightBox = () => {
    lightBox.classList.add("hidden");
    document.removeEventListener("keydown", handleKeyboardNavigation); // Supprimer l'écouteur clavier
  };

  // Gestion des événements clavier
  const handleKeyboardNavigation = (event) => {
    const { key } = event;

    if (key === "ArrowRight" || key === "Right") {
      // Flèche droite : média suivant
      currentIndex = (currentIndex + 1) % mediasByUser.length;
      displayMedia(currentIndex);
    } else if (key === "ArrowLeft" || key === "Left") {
      // Flèche gauche : média précédent
      currentIndex =
        (currentIndex - 1 + mediasByUser.length) % mediasByUser.length;
      displayMedia(currentIndex);
    } else if (key === "Escape" || key === "Esc") {
      // Touche Échappée : fermer la lightbox
      closeLightBox();
    }
  };

  articles.forEach((article, index) => {
    article.addEventListener("click", (e) => {
      lightBox.classList.remove("hidden");

      // Récupérer les médias du photographe
      const mediaphotographerId = e.currentTarget.getAttribute(
        "data-photographerId"
      );
      mediasByUser = media.filter(
        (media) => media.photographerId === parseInt(mediaphotographerId, 10)
      );

      // Initialiser l'index actif
      currentIndex = index;

      // Afficher le média initial
      displayMedia(currentIndex);

      // Ajout des événements pour navigation
      suivant.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % mediasByUser.length;
        displayMedia(currentIndex);
      });

      precedent.addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + mediasByUser.length) % mediasByUser.length;
        displayMedia(currentIndex);
      });

      // Ajout de la gestion des événements clavier
      document.addEventListener("keydown", handleKeyboardNavigation);
    });
  });

  // Ajouter des gestionnaires d'événements pour les interactions clavier
  articles.forEach((element) => {
    element.addEventListener("keydown", (event) => {
      // Simule un clic si Enter ou Space est pressé
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // Empêche tout comportement par défaut
        element.click(); // Simule un clic sur l'élément
      }
    });
  });

  // Fermer la lightbox via le bouton
  // closeButton.addEventListener("click", closeLightBox);
}

function closeLightBox() {
  const lightBox = document.querySelector(".lightBoxContainer");
  const lightBoxCloser = document.querySelector(".closeLightBox");

  lightBoxCloser?.addEventListener("click", () => {
    lightBox.classList.add("hidden");
  });
}
closeLightBox();


