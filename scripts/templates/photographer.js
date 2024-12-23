export function photographerTemplate(data) {
  const {
    name,
    portrait,
    city,
    tagline,
    price,
    country,
    title,
    image,
    likes,
    video,
    id,
    photographerId,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const p5 = document.createElement("p");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `portrait de ${name}`);
    h2.setAttribute("aria-label", "Nom de la photographe");
    p3.setAttribute("aria-label", "Localisation");
    p4.setAttribute("aria-label", "Spécialité du photographe");
    p5.setAttribute("aria-label", "Tarif journalier");
    article.setAttribute("role", "article");
    article.setAttribute("aria-labelledby", name);
    h2.textContent = name;
    p3.textContent = `${city}, ${country}`;
    p4.textContent = tagline;
    const prixParHeure = Math.floor(price / 24);
    p5.innerHTML = `${prixParHeure} &euro;/heure`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p3);
    article.appendChild(p4);
    article.appendChild(p5);
    return article;
  }
  function getUserCardHeaderInfos() {
    const article = document.createElement("article");
    const photograperName = document.querySelector("#photograperName");
    const pricePara = document.querySelector(".price");
    const h2 = document.createElement("h2");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const img = document.createElement("img");
    pricePara.setAttribute("aria-label", "Spécialité du photographe");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `portrait de ${name}`);
    h2.setAttribute("aria-label", "Nom de la photographe");
    p3.setAttribute("aria-label", "Localisation");
    p4.setAttribute("aria-label", "Spécialité du photographe");

    article.setAttribute("role", "article");
    article.setAttribute("aria-labelledby", name);
    h2.textContent = name;
    p3.textContent = `${city}, ${country}`;
    p3.textContent = `${city}, ${country}`;
    photograperName.textContent = name;
    pricePara.innerHTML = `${price}&euro;/jour`;
    article.appendChild(h2);
    article.appendChild(p3);
    article.appendChild(p4);

    return article;
  }
  function getUserCardHeaderImage() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `portrait de ${name}`);
    article.setAttribute("role", "article");
    article.setAttribute("aria-labelledby", name);
    article.appendChild(img);

    return article;
  }
  function createMediaCard() {
    // Créer l'article principal
    const article = document.createElement("article");
    article.classList.add("articleSectionCard");
    // article.setAttribute("role", "group");
    article.setAttribute("aria-label", `${title}`);
    article.setAttribute("likes", `${likes}`);
    article.setAttribute("titles", `${title}`);

    // Élément média (image ou vidéo)
    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.src = `./assets/photographers/${image}`;
      mediaElement.setAttribute("data-id", id);
      mediaElement.setAttribute("tabindex", "0");
      mediaElement.setAttribute("role", "button");
      mediaElement.setAttribute("data-photographerId", photographerId);
      mediaElement.alt = title; // Accessibilité
      mediaElement.classList.add("articleSectionCardImage");
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.src = `./assets/photographers/${video}`;
      mediaElement.setAttribute("aria-label", `video ${title}`);
      mediaElement.setAttribute("data-photographerId", photographerId);
      mediaElement.setAttribute("tabindex", "0");
      mediaElement.setAttribute("role", "button");
      mediaElement.controls = false;

      mediaElement.classList.add("articleSectionCardImage");
    }

    // Titre et likes
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("articleSectionCardInfos");

    const mediaTitle = document.createElement("p");
    mediaTitle.classList.add("articleSectionCardTitle");
    mediaTitle.textContent = title;

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("articleSectionCardLikes");

    const likeNumber = document.createElement("p");
    likeNumber.classList.add("articleSectionCardLikeNomber");
    likeNumber.textContent = likes;
    likeNumber.setAttribute("aria-label", `${likes}likes`);

    // Icônes de coeur (like)
    const heartContainer = document.createElement("div");
    heartContainer.classList.add("heartContainer");
    const heartEmpty = document.createElement("i");
    heartEmpty.classList.add("fa-regular", "fa-heart");
    heartEmpty.setAttribute("aria-label", `${title} like`);
    heartEmpty.setAttribute("role", "button");
    heartEmpty.setAttribute("tabindex", "0");

    const heartFull = document.createElement("i");
    heartFull.classList.add("fa-solid", "fa-heart");
    heartFull.setAttribute("aria-hidden", "false");

    heartContainer.appendChild(heartEmpty);
    heartContainer.appendChild(heartFull);

    // Ajouter les éléments au conteneur de likes
    likeContainer.appendChild(likeNumber);
    likeContainer.appendChild(heartContainer);

    // Ajouter le titre et les likes à l'infos container
    infoContainer.appendChild(mediaTitle);
    infoContainer.appendChild(likeContainer);

    // Ajouter les éléments au conteneur principal
    article.appendChild(mediaElement);
    article.appendChild(infoContainer);

    return article;
  }

  function handleLikes(medias) {
    const likeIconsSolid = document.querySelectorAll(
      "#main > section > article > div > div > div > i.fa-solid.fa-heart"
    );
    const likeIcons = document.querySelectorAll(
      "#main > section > article > div > div > div > i.fa-regular.fa-heart"
    );
    const likeCounts = document.querySelectorAll(
      ".articleSectionCardLikeNomber"
    );
    const totalLikedElement = document.querySelector(".totalLiked");
    if (!totalLikedElement) {
      return;
    }

    // Calcul initial du total des likes
    let totalLikes = medias.reduce((sum, media) => sum + media.likes, 0);
    totalLikedElement.textContent = totalLikes;

    likeIcons.forEach((icon, index) => {
      let isLiked = false; // Empêche le multi-like sur un même média

      // Vérifier si l'écouteur est déjà attaché
      if (!icon.dataset.listenerAttached) {
        // Gestion de l'événement "click"
        icon.addEventListener("click", () => {
          toggleLike(index, isLiked);
          isLiked = !isLiked; // Inverse l'état après chaque clic
        });

        // Gestion de l'événement "keydown" (Enter ou Space)
        icon.addEventListener("keydown", (event) => {
          const { key } = event;
          if (key === "Enter" || key === " ") {
            event.preventDefault(); // Empêche tout comportement par défaut
            toggleLike(index, isLiked);
            isLiked = !isLiked; // Inverse l'état après chaque pression de touche
          }
        });

        // Marquer cet élément comme ayant un écouteur attaché
        icon.dataset.listenerAttached = true;
      }
    });

    // Fonction pour gérer l'état du like
    function toggleLike(index, isLiked) {
      if (!isLiked) {
        // Passe à "aimé"
        likeIconsSolid[index].style.display = "inline-block";
        likeIcons[index].style.display = "none";

        // Met à jour les données et le DOM
        medias[index].likes += 1;
        totalLikes += 1;
        likeCounts[index].textContent = medias[index].likes;
        totalLikedElement.textContent = totalLikes;
      } else {
        // Passe à "non-aimé"
        likeIconsSolid[index].style.display = "none";
        likeIcons[index].style.display = "inline-block";

        // Met à jour les données et le DOM
        medias[index].likes -= 1;
        totalLikes -= 1;
        likeCounts[index].textContent = medias[index].likes;
        totalLikedElement.textContent = totalLikes;
      }
    }
  }

  return {
    name,
    picture,
    getUserCardDOM,
    getUserCardHeaderInfos,
    getUserCardHeaderImage,
    createMediaCard,
    handleLikes,
  };
}
