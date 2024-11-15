export function photographerTemplate(data) {
  const { name, portrait, city, tagline, price, country } = data;

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
  return {
    name,
    picture,
    getUserCardDOM,
    getUserCardHeaderInfos,
    getUserCardHeaderImage,
  };
}
