async function displayData(photographers) {
    const photographersSection = document.getElementById("photographer_section");
    
    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer); 
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    // eslint-disable-next-line no-undef
    const { photographers } = await getPhotographers(); 
    //console.log(photographers)
    displayData(photographers);
    
}

window.onload = init;