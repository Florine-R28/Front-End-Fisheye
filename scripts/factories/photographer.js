//create the empty slot to use it as many times as necessary
// eslint-disable-next-line no-unused-vars
function photographerFactory(photographerData) {
    //call data that we will use, stored in helpers/api.js
    const { name, id, city, tagline, price, portrait } = photographerData;

    const picture = `assets/photographers/${portrait}`;

    //empty template for homepage photographers locations
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

    //global information of the selected photographer
    function getUserPageDOM() {

        const patternPhotographerPage = `
            <div class="contact_details">
                <h2 class="photograph_name">${name}</h2>
                <div class="photograph_info">
                    <div class ="photograph_details">
                        <h3 class="photograph_city">${city}</h3>
                        <p class="photograph_tagline">${tagline}</p>
                    </div>
                    <div class="contact_photographer">
                        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                    </div>
                </div>
            </div>

            <div class="img_frame">
                <a><img class="photographer_img" alt="" src="assets/photographers/${portrait}"/></a>
            </div>
        `
        return patternPhotographerPage;
    }
    return { name, picture, getUserCardDOM, getUserPageDOM }
}