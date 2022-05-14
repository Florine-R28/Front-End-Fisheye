//create a lightbox 
//class (memorize properties and keep the state of the box)
// eslint-disable-next-line no-unused-vars
class Lightbox {
	//static (allows to initialize the lightbox x allows to define a static method of a class)
    static init() {
		//select all links that lead to photos/videos
        const links = Array.from(document.querySelectorAll('.photo_gallery'));
        const gallery = links.map(link => link.getAttribute('src'));

        links.forEach(link => {
			link.addEventListener("click", event => {
            	event.preventDefault();
            	new Lightbox(link.getAttribute('src'), gallery);
            })
		});
    }

	//create and initialize an object when using the class keyword.
    constructor(url, images) {
        this.element = this.buildDOM(url);
		this.images = images;
		this.loadImage(url); 
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);
		document.addEventListener('keyup', this.onKeyUp);
    }

    //load the media after the loader
	loadImage(url) {
		this.url = null;
		const image = new Image();
		const container = this.element.querySelector(".lightbox_container");
		const loader = document.createElement('div');
		loader.classList.add('lightbox_loader');
		container.innerHTML = '';
		container.appendChild(loader);
		image.onload = () => {
			container.removeChild(loader)
			container.appendChild(image)
			this.url = url 
		}
		image.src = url;
	}

	//keyboard navigation
	onKeyUp(event) {
		if (event.key === 'Escape') {
			this.close(event);
		} else if (event.key === 'Enter') {
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
		console.log(this.images)
		console.log(this.url)
		let i = this.images.findIndex(image => image === this.url);
		if (i === this.images.length - 1) {
			i = -1
		}
		this.loadImage(this.images[i + 1]);
	}

	
	//switch to the previous image
	previous(event) {
		event.preventDefault();
		let i = this.images.findIndex(image => image === this.url);
		if (i === 0) {
			i = this.images.length;
		}
		this.loadImage(this.images[i - 1]);
	}


	//call media link
	//send x return an html element
	buildDOM() {
		const dom = document.createElement('div');
		dom.classList.add('lightbox');
		dom.innerHTML = `<button id="lightbox_close" class="lightbox_close" role="button" aria-label="fermer le formulaire">Close</button>
		<button class="lightbox_next" role="button" aria-label="media suivante">Next</button>
		<button class="lightbox_previous" role="button" aria-label="media précédente">Previous</button>
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

