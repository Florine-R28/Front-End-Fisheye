function photographerFactory(data) {
    const { name, id, city, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' ); 
        article.className = "photographer_section_article";

        const patternHomePage = `
                <a href='photographer.html?id=${id}'>
                    <img class="photographer_img" alt="" src="assets/photographers/${portrait}">
                </a>
                    <h2 class="photographer_name">${name}</h2>

                <div class="photographer_info">
                    <h3 class="photographer_localization">${city}</h3>
                    <p class="photographer_tagline"><strong>${tagline}</strong></p>
                    <p class ="photographer_price">${price}€/jour</p>
                </div>
        `
        article.innerHTML = patternHomePage;

        return (article);
    }
    return { name, picture, getUserCardDOM }
}