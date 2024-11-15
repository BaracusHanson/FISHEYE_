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
    p5.innerHTML = `${price} &euro;/jour`;
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
    const h2 = document.createElement("h2");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const img = document.createElement("img");
    // const p5 = document.createElement("p");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `portrait de ${name}`);
    h2.setAttribute("aria-label", "Nom de la photographe");
    p3.setAttribute("aria-label", "Localisation");
    p4.setAttribute("aria-label", "Spécialité du photographe");
    // p5.setAttribute("aria-label", "Tarif journalier");
    article.setAttribute("role", "article");
    article.setAttribute("aria-labelledby", name);
    h2.textContent = name;
    p3.textContent = `${city}, ${country}`;
    p4.textContent = tagline;
    photograperName.textContent = name;
    // p5.innerHTML = `${price} &euro;/jour`;
    // article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p3);
    article.appendChild(p4);
    // article.appendChild(p5);
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
    article.setAttribute("role", "group");
    article.setAttribute("aria-label", `${title}, ${likes} likes`);

    // Élément média (image ou vidéo)
    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.src = `./assets/photographers/${image}`;
      mediaElement.alt = title; // Accessibilité
      mediaElement.classList.add("articleSectionCardImage");
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.src = `./assets/photographers/${video}`;
      mediaElement.setAttribute("aria-label", title); // Accessibilité
      mediaElement.controls = true; // Vidéo contrôlable
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
    likeNumber.setAttribute("aria-label", `Nombre de likes : ${likes}`);

    // Icônes de coeur (like)
    const heartContainer = document.createElement("div");
    heartContainer.classList.add("heartContainer");
    const heartEmpty = document.createElement("i");
    heartEmpty.classList.add("fa-regular", "fa-heart");
    heartEmpty.setAttribute("aria-hidden", "true");

    const heartFull = document.createElement("i");
    heartFull.classList.add("fa-solid", "fa-heart");
    heartFull.setAttribute("aria-hidden", "true");

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

  return {
    name,
    picture,
    getUserCardDOM,
    getUserCardHeaderInfos,
    getUserCardHeaderImage,
    createMediaCard,
  };
}