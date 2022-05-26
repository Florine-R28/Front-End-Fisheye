/* eslint-disable no-mixed-spaces-and-tabs */
//create a lightbox 
//class (memorize properties and keep the state of the box)
// eslint-disable-next-line no-unused-vars
class Lightbox {
	//static (allows to initialize the lightbox x allows to define a static method of a class)
    static init() {
		//select all links that lead to photos/videos
        const links = Array.from(document.querySelectorAll(".mediaLink"));
        const gallery = links.map(link => link.getAttribute("href"));
		const legendMedias = Array.from(document.querySelectorAll(".titlePhoto"));

        links.forEach((link, index) => {
			link.addEventListener("click", event => {
            	event.preventDefault();
            	new Lightbox(link.getAttribute('href'), gallery, legendMedias[index].textContent);
            })
		});
    }

	//create and initialize an object when using the class keyword.
    constructor(url, images, legend) {
        this.element = this.buildDOM(url);
		this.images = images;
		this.legend = legend; 
		if (url.includes("jpg")) {
			this.loadImage(url);
		} else {
			this.loadVideo(url);
		}	 
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);
		document.addEventListener('keyup', this.onKeyUp);
    }

    //load the media after the loader
	loadImage(url) {
		this.url = null;
		const image = new Image();
		const container = document.querySelector(".lightbox_container") || this.element.querySelector(".lightbox_container");
		const loader = document.createElement('div');
		loader.classList.add('lightbox_loader');
		container.innerHTML = '';
		container.appendChild(loader);
		image.onload = () => {
			container.removeChild(loader);
			container.appendChild(image);
			const legendMedia = document.createElement('div');
			legendMedia.classList.add('lightbox_legend');
			legendMedia.setAttribute('alt', `legende`);
			legendMedia.innerText = this.legend;
			container.appendChild(legendMedia);
			this.url = url 
		}
		image.src = url;
	}

	loadVideo (url) {
		this.url = null;
        const source = document.createElement('source');
        source.setAttribute('src', url)
        const videoElement = document.createElement('video');
        videoElement.setAttribute('controls', true);
        videoElement.setAttribute('alt', this.legend);
        videoElement.appendChild(source);
		const container = document.querySelector(".lightbox_container") || this.element.querySelector(".lightbox_container");
		container.innerHTML = '';
		container.appendChild(videoElement);
		const legendMedia = document.createElement('div');
			legendMedia.classList.add('lightbox_legend');
			legendMedia.setAttribute('alt', `legende`);
			legendMedia.innerText = this.legend;
			container.appendChild(legendMedia);
			this.url = url 
	}

	//keyboard navigation
	onKeyUp(event) {
		if (event.key === 'Escape') {
			this.close(event);
		} else if (event.key === 'ArrowLeft') {
			this.previous(event);
		} else if (event.key === 'ArrowRight') {
			this.next(event);
		}
	}

	//close the lightbox 
	close(event) {
		event.preventDefault();
		this.element.classList.add('fadeOut');
		window.setTimeout(() => {
			this.element.parentElement.removeChild(this.element);
		}, 500);
		document.removeEventListener('keyup', this.onKeyUp);
	}

	//switch to the next image
	next(event) {
		event.preventDefault();
		let i = this.images.findIndex(image => image === this.url);
		if (i === this.images.length - 1) {
			i = -1
		}
		if (this.images[i + 1].includes("jpg")) {
			this.loadImage(this.images[i + 1]);
		} else {
			this.loadVideo(this.images[i + 1]);
		}
	}

	//switch to the previous image
	previous(event) {
		event.preventDefault();
		let i = this.images.findIndex(image => image === this.url);
		if (i === 0) {
			i = this.images.length;
		}
		if (this.images[i - 1].includes("jpg")) {
			this.loadImage(this.images[i - 1]);
		} else {
			this.loadVideo(this.images[i - 1]);
		}
	}


	//call media link
	//send x return an html element
	buildDOM() {
		const dom = document.createElement('div');
		dom.classList.add('lightbox');
		dom.innerHTML = `<button id="lightbox_close" class="lightbox_close" role="button" aria-label="fermer la lightbox">Close</button>
		<button class="lightbox_next" role="button" aria-label="image suivante">Next</button>
		<button class="lightbox_previous" role="button" aria-label="image précédente">Previous</button>
		<div class="lightbox_container" role="dialog">
		</div>`;
		dom.querySelector(".lightbox_close").addEventListener("click", this.close.bind(this));
		dom.querySelector(".lightbox_next").addEventListener("click", this.next.bind(this));
		dom.querySelector(".lightbox_previous").addEventListener("click", this.previous.bind(this));
		const closeElement = dom.querySelector('.lightbox_close');
		closeElement.focus();
		return dom;
	}
}

