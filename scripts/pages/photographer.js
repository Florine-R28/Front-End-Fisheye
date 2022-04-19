/**
* @async Display photographer data, based on his ID
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

	/**
 	* Filter media gallery with select option params
 	* @param {Array} mediaGallery
 	* @param {String} option
 	* @returns {Array} - return a sorted media array
 	*/
	const dropMenu = document.getElementById("container_scrolling");
	const filterByOption = (mediaGallery, dropMenu) => {
		switch (dropMenu) {
			case "popularity":
				return mediaGallery.sort((a, b) => {
					return b.likes - a.likes;
				});
			case "date":
				return mediaGallery.sort((a, b) => {
					return new Date(b.date) - new Date(a.date);
				});
			case "title":
				return mediaGallery.sort((a, b) => a.title.localeCompare(b.title));
			default:
				return mediaGallery.sort((a, b) => {
					return b.likes - a.likes;
				});
		}
	};

	for (let i = 0; i < mediaGallery.length; i ++) {
		const media = mediaFactory(mediaGallery[i]);
		const patternHTML = media.getMediaCardDOM();
		mediaCard.innerHTML += /*ajouté ce qui est à droit à innerHTML*/ patternHTML;

		totalLikes = mediaGallery[i].likes + totalLikes; 
	}

	/*const likesSection = document.getElementById("textPhoto");
	likesSection.forEach(function(i) {
		i.addEventListener('click', function(){
			let iconButton = document.getElementById("heart"); 
			let numberLikes = document.getElementById("numberLikes");
			let count = parseInt(numberLikes.innerText);
			if () {
				//si un click est fait alors ajouter 1 à la photo et +1 à la somme totale des photos
			} else {

			}

		iconButton.
			count = count+1; 
			numberLikes.innerHTML = count;
		})
	});*/

	const totalLikesGlobal = document.getElementById("box");
	
	totalLikesGlobal.innerHTML = `
	<p>${totalLikes}</p><i class="fas fa-heart"></i>
    <p>${selectedPhotographerData.price}/jour</p>
	`
	
	Lightbox.init(); 

	const selectedPhotographers = document.getElementById("photograph_identity");
	const photographerPattern = photographerFactory(selectedPhotographerData);
	const UserPageDOM = photographerPattern.getUserPageDOM();
	/*console.log(selectedPhotographers);*/
	selectedPhotographers.innerHTML = UserPageDOM;
}

window.onload = init;

