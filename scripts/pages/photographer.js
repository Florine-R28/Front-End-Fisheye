//Mettre le code JavaScript lié à la page photographer.html
function init() {
    let params = new URLSearchParams(window.location.search);
    const photographerID = params.get('id');

    fetch
    async function displayPhotographerData() {
        const { media, photographers } = await getData()
        const id = window.location.search.split('id=')[1];
        const photographer = !id ? photographers : photographers.filter(photographer => photographer.id == id);
        const $photographerHeader = document.querySelector('.photographer-page')
        $photographerHeader.innerHTML += `
            <h1>${photographer[0].name}</h1>
            <p>${photographer[0].city}, ${photographer[0].country} </p>
            <img src="../assets/photographers/${photographer[0].portrait}">
            <p >${photographers[0].tags.map(tag => `<a href="../index.html">#${tag}</a>`).join(" ")}</p>
            `
        console.log(photographer[0])
    
}

window.onload = init;

