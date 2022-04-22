//function media
function mediaFactory(mediaData) {
    const {id, photographerId, title, image, video, likes } = mediaData;

    // the photo block is broken down into an html element
    function getMediaCardDOM() {

        //div photo block
        /*<div id="photoBlock" class="bloc_photo"></div>*/
        const photoBlock = document.createElement('div');
        photoBlock.setAttribute("aria-label", "bloc photo");

        //link for the media
        let linkElement = document.createElement('a');
        //const mediaLink = document.getElementById('mediaLink');
        linkElement.classList.add('mediaLink');
        linkElement.classList.add('photo_gallery');

        if (image /*== undefined*/) {
            linkElement = `<a /*class="mediaLink"*/ href="assets/Sample Photos/${photographerId}/${image}"><img class="photo_gallery" src="assets/Sample Photos/${photographerId}/${image}" alt="${title}"/></a>`
        } else {
            linkElement = `<a class="mediaLink" href="assets/Sample Photos/${photographerId}/${video}"><video class="photo_gallery"><source src="assets/Sample Photos/${photographerId}/${video}"/>${title}</video></a>`
        } 
        //insert the media in the photo block
        mediaLink.insertBefore(linkElement, linkElement);

        /*photoBlock.appendChild(linkElement);
        linkElement.appendChild(linkElement);

        document.body.insertBefore(photoBlock.get(0), linkElement.get(0));*/

        //text of the media
        /*<div id="textPhoto" class="text_photo"></div>*/
        const textPhoto = document.createElement('div');
        textPhoto.classList.add('text_photo');
        textPhoto.setAttribute("aria-label", "texte photo");

        //insert textPhoto in photoBlock
        photoBlock.appendChild(div);
        div.appendChild(textPhoto);

        //insert h3 in photoBlock
        /*<h3>${title}</h3>*/
        const titlePhoto = document.createElement('h3');
        document.body.insertBefore(photoBlock, titlePhoto);

        //likes
        /*<div id="likes" class="likes">*/
        const likes = document.createElement('div');
        likes.classList.add('likes'); 

        document.body.insertBefore(titlePhoto, likes);

        //heart
        /*<p id="numberLikes(id du média à rajouter) aria-label="likes">${likes}</p>*/
        const numberLikes = document.createElement('p');
        numberLikes.classList.add('numberLikes');
        numberLikes.setAttribute("aria-abel", "likes");

        div.appendChild(p);
        p.appendChild(numberLikes); 

        //
        function handleClickLike() {
            console.log(handleClickLike)
            mediaData.likes +=1 
        }

        const heart = document.createElement('i'); 
        heart.classList.add('fas');
        heart.classList.add('fa-heart');
        heart.setAttribute("aria-label", "likes");
        heart.setAttribute("role", "button"); 
        heart.addEventListener('click', function(){
            mediaData.likes = mediaData.likes > likes ? mediaData.likes-1 : mediaData.likes+1;
            const numberLikes = document.getElementById(`numberLikes-${id}`);
            numberLikes.innerText = mediaData.likes;
            updateTotalLikes( mediaData.likes > likes ? "less" :"add");
        })

        div.appendChild(i);
        i.appendChild(heart);

        


        const patternMedia /*string*/ = `
            <div class="bloc_photo">
                ${linkElement}  
                    <div id="textPhoto" class="text_photo">
                        <h3>${title}</h3>
                            <div id="likes" class="likes">
                                <p id="numberLikes /*id du média à rajouter*/" aria-label="likes">${likes}</p>
                                ${heart}
                            </div>
                    </div>
            </div>
        `
        return patternMedia;
    }
    return { getMediaCardDOM };
}
