//Mettre le code JavaScript lié à la page photographer.html
//function init() {
//    let params = new URLSearchParams(window.location.search);
//    const photographerID = params.get('id');
//}

/**
* @async Display photogrrapher data, based on his ID
* @const {Array | Objects} media & photographers
* @const params - Get params in URL
* @const photographerID - Get id in params
* @const selectedPhotographerData - return
*/
async function init/*displayPhotograperData*/() {
	const { medias, photographers } = await getPhotographers();
	let params = new URLSearchParams(document.location.search);
	const photographerID = params.get("id");
	const selectedPhotographerData = photographers.find(
		(photographer) => photographer.id.toString() /*number*/ === photographerID /*string params.get*/
	);
	
    const mediaGallery = medias.filter((media) => media.photographerId.toString() === photographerID);
    //utilise la fonction photographerFactory dans factories/photgrapher.js pour construire le photogrphe
    // passer les données du photographe (selectedPhotographerData)

	const selectedPhotographers = document.getElementById("photograph_identity");
	const photographerPattern = photographerFactory(selectedPhotographerData);
	const UserPageDOM = photographerPattern.getUserPageDOM();
	console.log(selectedPhotographers);
	selectedPhotographers.innerHTML = UserPageDOM;
}

window.onload = init;

