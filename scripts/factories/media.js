//empty space for a media
// eslint-disable-next-line no-unused-vars
function mediaFactory(mediaData) {
     //call data that we will use, stored in helpers/api.js
    const {id, photographerId, title, image, video, likes } = mediaData;

    // the media block is broken down into an html element
    function getMediaCardDOM() {

        //block photo section
        const photoBlock = document.createElement('div');
        photoBlock.classList.add("bloc_photo");
        photoBlock.setAttribute('id', `photoBlock-${id}`);

        //link for the media
        let linkElement = document.createElement('a');
        linkElement.classList.add('mediaLink');
        linkElement.setAttribute('tabindex', 0);
      
        //condition if it is an image or a video
        if (image) { 
            linkElement.setAttribute('href', `assets/Sample Photos/${photographerId}/${image}`);
            const img = document.createElement('img');
            img.classList.add('photo_gallery');
            img.setAttribute('src', `assets/Sample Photos/${photographerId}/${image}`);
            img.setAttribute('alt', title);
            linkElement.appendChild(img);
            
        } else {
            linkElement.setAttribute('href', `assets/Sample Photos/${photographerId}/${video}`);
            const source = document.createElement('source');
            source.setAttribute('src', `assets/Sample Photos/${photographerId}/${video}`)
            const videoElement = document.createElement('video');
            videoElement.setAttribute('id', `controls`);
            videoElement.classList.add('photo_gallery');
            videoElement.setAttribute('alt', `title`);
            videoElement.appendChild(source);
            linkElement.appendChild(videoElement);
        } 
          
        photoBlock.appendChild(linkElement);
        
        //media text
        const textPhoto = document.createElement('div');
        textPhoto.classList.add('text_photo');
        textPhoto.setAttribute('id', `textPhoto-${id}`);

        //title
        const titlePhoto = document.createElement('h3');
        titlePhoto.classList.add('titlePhoto');
        titlePhoto.setAttribute('aria-label', "titre");
        titlePhoto.innerText = title;
        textPhoto.appendChild(titlePhoto);

        //likes div (contains numbers of likes x heart)
        const likesElement = document.createElement('div');
        likesElement.classList.add('likes'); 
        likesElement.setAttribute('id', `likes-${id}`);

        //numbers of likes
        const numberLikes = document.createElement('p');
        numberLikes.classList.add('numberLikes');
        numberLikes.setAttribute("aria-abel", "j'aime");
        numberLikes.setAttribute('id', `numberLikes-${id}`);
        numberLikes.innerText = likes;

        likesElement.appendChild(numberLikes);

        //heart x add or remove a like
        const heart = document.createElement('i'); 
        heart.setAttribute("tabindex", "0");
        heart.classList.add('fas');
        heart.classList.add('fa-heart');
        heart.setAttribute("aria-label", "likes");
        heart.setAttribute("role", "button");

        function addHeart() {
            mediaData.likes = mediaData.likes > likes ? mediaData.likes-1 : mediaData.likes+1;
            const numberLikes = document.getElementById(`numberLikes-${id}`);
            numberLikes.innerText = mediaData.likes;
            // eslint-disable-next-line no-undef
            updateTotalLikes( mediaData.likes > likes ? "add" :"less"); 
        }

        heart.addEventListener('click', function(){
            addHeart();
        });
        heart.addEventListener('keyup', function(event){
            if (event.key === "Enter") {
                addHeart();
            }
        });

        likesElement.appendChild(heart);
        textPhoto.appendChild(likesElement);

        //insert global div textPhoto in photoBlock
        photoBlock.appendChild(textPhoto);

        return photoBlock;
    }
    return { getMediaCardDOM };
}
