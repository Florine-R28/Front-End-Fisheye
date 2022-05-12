//initialize likes to 0
let totalLikes = 0; 

//call everything that makes up the page
function displayMedias(medias){
	const mediaCard = document.getElementById("container_gallery");
	mediaCard.innerHTML="";
	for (let i = 0; i < medias.length; i ++) {
		//call of the function for a media in factories/media.js
		// eslint-disable-next-line no-undef
		const media = mediaFactory(medias[i]); 
		//call of the function for global information of the selected photographer in factories/photographer.js
		const patternHTML = media.getMediaCardDOM();
		//insertion of the gallery in the photographer page
		mediaCard.appendChild(patternHTML);

		totalLikes = medias[i].likes + totalLikes; 
	}
}

//initialize page content
async function init() {
	//call the requested photographer x associated media
	// eslint-disable-next-line no-undef
	const { medias, photographers } = await getPhotographers();
	let params = new URLSearchParams(document.location.search);
	const photographerID = params.get("id");
	const selectedPhotographerData = photographers.find(
		(photographer) => photographer.id.toString() === photographerID
	);
	
    const mediaGallery = medias.filter((media) => media.photographerId.toString() === photographerID);
	
	//filter for dropdown menu
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

	//insert the total of likes (bottom right above the page) x call helpers/photographer.js for add or remove 1
	const totalLikesGlobal = document.getElementById("box");
	
	totalLikesGlobal.innerHTML = `
	<p id="totalLikesGlobal" aria-label="total des likes et prix par jour">${totalLikes}</p><i class="fas fa-heart"></i>
    <p>${selectedPhotographerData.price}/jour</p>
	`
	//lightbox call
	// eslint-disable-next-line no-undef
	Lightbox.init();

	//call the information section of the photographer in factories/photographer.js
	const selectedPhotographers = document.getElementById("photograph_identity");
	// eslint-disable-next-line no-undef
	const photographerPattern = photographerFactory(selectedPhotographerData);
	const UserPageDOM = photographerPattern.getUserPageDOM();
	selectedPhotographers.innerHTML = UserPageDOM;
}

//initialize init function
window.onload = init;

