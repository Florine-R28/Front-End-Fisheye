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
	
    const mediaGallery /*tableau*/ = medias.filter((media) => media.photographerId.toString() === photographerID);
	const mediaCard = document.getElementById("container_gallery");
	let totalLikes = 0 ; /*initialisation*/


	for (let i = 0; i < mediaGallery.length; i ++) {
		const media = mediaFactory(mediaGallery[i]);
		const patternHTML = media.getMediaCardDOM();
		mediaCard.innerHTML += /*ajouté ce qui est à droit à innerHTML*/ patternHTML;

		totalLikes = mediaGallery[i].likes + totalLikes;  	
	}

	const totalLikesGlobal = document.getElementById("box");
	console.log(box)
	totalLikesGlobal.innerHTML = `
	<p>${totalLikes}</p><i class="fas fa-heart"></i>
    <p>${selectedPhotographerData.price}/jour</p>
	`
	
	Lightbox.init(); 

	const selectedPhotographers = document.getElementById("photograph_identity");
	const photographerPattern = photographerFactory(selectedPhotographerData);
	const UserPageDOM = photographerPattern.getUserPageDOM();
	console.log(selectedPhotographers);
	selectedPhotographers.innerHTML = UserPageDOM;
}

window.onload = init;

