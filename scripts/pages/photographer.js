//initialization of likes to 0
let totalLikes = 0; 


function displayMedias(medias){
	const mediaCard = document.getElementById("container_gallery");
	mediaCard.innerHTML="";
	for (let i = 0; i < medias.length; i ++) {
		// eslint-disable-next-line no-undef
		const media = mediaFactory(medias[i]); 
		const patternHTML = media.getMediaCardDOM();
		mediaCard.appendChild(patternHTML);

		totalLikes = medias[i].likes + totalLikes; 
	}
}

async function init/*displayPhotograperData*/() {
	// eslint-disable-next-line no-undef
	const { medias, photographers } = await getPhotographers();
	let params = new URLSearchParams(document.location.search);
	const photographerID = params.get("id");
	const selectedPhotographerData = photographers.find(
		(photographer) => photographer.id.toString() /*number*/ === photographerID /*string params.get*/
	);
	
    const mediaGallery /*tableau*/ = medias.filter((media) => media.photographerId.toString() === photographerID);
	
	//sort photos with a filter
	const scrollingMenu = document.getElementById("choice_list");
	function filterByOption (event){
		mediaGallery.sort(function(a,b){
			switch (event.target.value) {
				case "date":
					return new Date(b.date) - new Date(a.date);
				case "title":
					return (a.title).localeCompare(b.title);
				case "popularity":
				default:
					return b.likes - a.likes;
			}
		})
		
		displayMedias(mediaGallery);
	}

	scrollingMenu.addEventListener('change', filterByOption);
	displayMedias(mediaGallery);

	const totalLikesGlobal = document.getElementById("box");
	
	totalLikesGlobal.innerHTML = `
	<p id="totalLikesGlobal" aria-label="total des likes et prix par jour">${totalLikes}</p><i class="fas fa-heart"></i>
    <p>${selectedPhotographerData.price}/jour</p>
	`
	
	// eslint-disable-next-line no-undef
	Lightbox.init();

	const selectedPhotographers = document.getElementById("photograph_identity");
	// eslint-disable-next-line no-undef
	const photographerPattern = photographerFactory(selectedPhotographerData);
	const UserPageDOM = photographerPattern.getUserPageDOM();
	/*console.log(selectedPhotographers);*/
	selectedPhotographers.innerHTML = UserPageDOM;
}

window.onload = init;

