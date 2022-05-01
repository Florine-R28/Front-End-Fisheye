//function media
function mediaFactory(mediaData) {
    const {id, photographerId, title, image, video, likes } = mediaData;

    // the photo block is broken down into an html element
    function getMediaCardDOM() {

        //div photo block
        /*<div id="photoBlock" class="bloc_photo"></div>*/
        const photoBlock = document.createElement('div');
        photoBlock.classList.add("bloc_photo");
        photoBlock.setAttribute('id', `photoBlock-${id}`);

        //link for the media
        let linkElement = document.createElement('a');
        //const mediaLink = document.getElementById('mediaLink');
        linkElement.classList.add('mediaLink');
      

        if (image /*== undefined*/) {
            //set attribute => href
            //create a image element
            //insert img in linkElement
            linkElement = `<a /*class="mediaLink"*/ href="assets/Sample Photos/${photographerId}/${image}"><img class="photo_gallery" src="assets/Sample Photos/${photographerId}/${image}" alt="${title}"/></a>`
        } else {
            //set attribute => href
            //creation a video element
            //insert video in linkElement
            linkElement = `<a class="mediaLink" href="assets/Sample Photos/${photographerId}/${video}"><video class="photo_gallery"><source src="assets/Sample Photos/${photographerId}/${video}"/>${title}</video></a>`
        } 
        //insert the media in the photo block
        //photoBlock.appendChild(linkElement);  
        photoBlock.innerHTML = linkElement;
        
        //text of the media
        /*<div id="textPhoto" class="text_photo"></div>*/
        const textPhoto = document.createElement('div');
        textPhoto.classList.add('text_photo');
        textPhoto.setAttribute('id', `textPhoto-${id}`);

        //insert h3 in photoBlock
        /*<h3>${title}</h3>*/
        const titlePhoto = document.createElement('h3');
        titlePhoto.innerText = title;
        textPhoto.appendChild(titlePhoto);

        //likes
        /*<div id="likes" class="likes">*/
        const likesElement = document.createElement('div');
        likesElement.classList.add('likes'); 
        likesElement.setAttribute('id', `likes-${id}`);

        //heart
        /*<p id="numberLikes(id du média à rajouter) aria-label="likes">${likes}</p>*/
        const numberLikes = document.createElement('p');
        numberLikes.classList.add('numberLikes');
        numberLikes.setAttribute("aria-abel", "j'aime");
        numberLikes.setAttribute('id', `numberLikes-${id}`);
        numberLikes.innerText = likes;

        likesElement.appendChild(numberLikes);

        //
        const heart = document.createElement('i'); 
        heart.classList.add('fas');
        heart.classList.add('fa-heart');
        heart.setAttribute("aria-label", "likes");
        heart.setAttribute("role", "button"); 
        heart.addEventListener('click', function(){
            mediaData.likes = mediaData.likes > likes ? mediaData.likes-1 : mediaData.likes+1;
            const numberLikes = document.getElementById(`numberLikes-${id}`);
            numberLikes.innerText = mediaData.likes;
            updateTotalLikes( mediaData.likes > likes ? "add" :"less");
        })

        likesElement.appendChild(heart);
        textPhoto.appendChild(likesElement);

        //insert  gloval div textPhoto in photoBlock
        photoBlock.appendChild(textPhoto);

        return photoBlock;

    }
    return { getMediaCardDOM };
}
