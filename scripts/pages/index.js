//step 1 : create an empty model
async function displayData(photographers) {
    const photographersSection = document.getElementById("photographer_section");
    
    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer); 
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

//step 2 : retrieve the data x insert it into the empty slots
async function init() {
    // eslint-disable-next-line no-undef
    const { photographers } = await getPhotographers(); 
    displayData(photographers);
}

//step 3 : start it all
window.onload = init;