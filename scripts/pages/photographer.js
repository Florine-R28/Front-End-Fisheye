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
* @const $photographerHeader {HTMLElement} - Get html for place photographer header
* @const mediaGallery - Return array of medias, based on photographer id
* @function updateMediaGallery
* @event listen when user change select state
*/
async function displayPhotographerData() {
	const { medias, photographers } = await getPhotographers();
	let params = new URLSearchParams(document.location.search);
	const photographerID = params.get("id");
	const selectedPhotographerData = photographers.find(
		(photographer) => photographer.id == photographerID
	);
    const mediaGallery = medias.filter((media) => media.photographerId == photographerID);
    //utilise la fonction photographerFactory dans factories/photgrapher.js pour construire le photogrphe
    // passer les données du photographe (selectedPhotographerData)

	

	updateMediaGallery(mediaGallery);

	document.addEventListener("change", function (event) {
		$elementGallery.innerHTML = "";
		const option = filterByOption(mediaGallery, event.target.value);
		updateMediaGallery(option);
		Lightbox.init()
	});

	const $photographerHeader = document.querySelector(".photographer-page__header-section");
	$photographerHeader.innerHTML += new Photographer(selectedPhotographerData).userHeader;
}

/**
 * Update media gallery
 * @param {Array} gallery
 */
function updateMediaGallery(gallery) {
	gallery.forEach((media) => {
		let medias = new MediaFactory(media);
		$elementGallery.innerHTML += medias.createHtml();
	});
}

function getAndUpdateLikes() {
	const $likesSection = document.querySelectorAll(
		".photographer-page__gallery__media__footer__like-section"
	);

	function reloadLikes() {
		let $likeCounter = document.querySelector('.photographer-page__footer__aside__total-likes')
		let $totalLikesElements = document.querySelectorAll(
			".photographer-page__gallery__media__footer__like-section-counter"
		);
		let likeSum = 0
		$totalLikesElements.forEach(function (like) {
			let likeUnit = Number(like.textContent)
			likeSum += likeUnit
		});
		$likeCounter.innerHTML = likeSum
		return likeSum
	}

	$likesSection.forEach(function (i) {
		i.addEventListener("click", function () {
			let elementCounter = i.querySelector(
				".photographer-page__gallery__media__footer__like-section-counter"
			);
			let button = i.querySelector('.photographer-page__gallery__media__footer__like-section-button')
			let iconButton = i.querySelector(".fa-heart");
			let likeSum = Number(elementCounter.textContent);
			const liked = i.dataset.liked === "true";
			i.dataset.liked = !liked;
			elementCounter.innerHTML = likeSum + (!liked ? 1 : -1);
			if (liked) {
				reloadLikes();
				iconButton.classList.add("far");
				iconButton.classList.remove("fas");
				button.ariaLabel = "J'aime pas"
			} else if (!liked) {
				reloadLikes();
				iconButton.classList.add("fas");
				iconButton.classList.remove("far");
				button.ariaLabel = "J'aime"
			}
		});
	});
}

/**
 * Function for initialized page
 */
const init = async () => {
	await displayPhotographerData();
	getAndUpdateLikes();
	Lightbox.init();
};

window.onload = init;

