//Mettre le code JavaScript lié à la page photographer.html
function init() {
    let params = new URLSearchParams(window.location.search);
    const photographerID = params.get('id');
    console.log(photographerID)
}

window.onload = init;

