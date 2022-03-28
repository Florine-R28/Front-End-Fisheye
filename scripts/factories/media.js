//function media
async function mediaFactory(mediaData) {
    const { title, image, video, likes } = mediaData;
    const { medias, photographers } = await getPhotographers();
    let params = new URLSearchParams(document.location.search);
	const photographerID = params.get("id");

    function getMediaCardDOM() {

        let linkElement;
        if (image /*== undefined*/) {
            linkElement = `<a href="assets/Sample Photos/${photographerID}/${image}"><img class="photo_gallery" src="assets/Sample Photos/${photographerId}/${image}" alt="${title}"/>`
        } else {
            linkElement = `<a href="assets/Sample Photos/${photographerID}/${video}"><video class="photo_gallery"><source src="assets/Sample Photos/${photographerId}/${video}"/>${title}</video>`
        } 

        const patternMedia /*string*/ = `
            <div class="bloc_photo">
                ${linkElement}  
                    <div class="text_photo">
                        <h3>${title}/h3>
                        <p>${likes} <i class="fas fa-heart heart-btn" aria-label="likes" role="button"></i></p>
                    </div>
                </a>
            </div>
        `
        return patternMedia;
    }
    return { getMediaCardDOM };
}

window.onload = mediaFactory;