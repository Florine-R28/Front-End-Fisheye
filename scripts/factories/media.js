//function media
function mediaFactory(mediaData) {
    const {photographerId, title, image, video, likes } = mediaData;

    function getMediaCardDOM() {

        let linkElement;
        if (image /*== undefined*/) {
            linkElement = `<a class="mediaLink" href="assets/Sample Photos/${photographerId}/${image}"><img class="photo_gallery" src="assets/Sample Photos/${photographerId}/${image}" alt="${title}"/></a>`
        } else {
            linkElement = `<a class="mediaLink" href="assets/Sample Photos/${photographerId}/${video}"><video class="photo_gallery"><source src="assets/Sample Photos/${photographerId}/${video}"/>${title}</video></a>`
        } 

        const patternMedia /*string*/ = `
            <div class="bloc_photo">
                ${linkElement}  
                    <div class="text_photo">
                        <h3>${title}</h3>
                        <p>${likes} <i class="fas fa-heart heart-btn" aria-label="likes" role="button"></i></p>
                    </div>
            </div>
        `
        return patternMedia;
    }
    return { getMediaCardDOM };
}
