//create a lightbox 
// eslint-disable-next-line no-unused-vars
class Lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('.photo_gallery'));
        const gallery = links.map(link => link.getAttribute('src'));

		//open lightbox by keyboard
        links.forEach(link => {
			link.addEventListener("click", event => {
            	event.preventDefault();
            	new Lightbox(link.getAttribute('src'), gallery);
            })
			link.addEventListener("keyup", event => {
				console.log(event.key)
				if (event.key === "Enter"){
				new Lightbox(link.getAttribute('src'), gallery);
			}});
		});
    }

    /**
	 * @param {string} url URl de l'image
	 * @param {string[]} images Chemins des images de la lightbox
	 */
    constructor(url, images) {
        this.element = this.buildDOM(url);
		this.images = images;
		this.loadImage(url); /* charger l'img sur lequel on a cliqué*/
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);/*inserer le html pour qu'il puisse s'afficher*/
		document.addEventListener('keyup', this.onKeyUp);/*utiliser le touches du clavier pour changer d'images*/
    }

    /**
	 * @param {string} url Url de l'image
	 */
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

	/**
	 * @param {KeyboardEvent} event
	 */
	onKeyUp(event) {
		if (event.key === 'Escape') {
			this.close(event);
		} else if (event.key === 'ArrowLeft') {
			this.previous(event);
		} else if (event.key === 'ArrowRight') {
			this.next(event);
		}
	}

	//close modal
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
		let i = this.images.findIndex(image => image === this.url);/*recup la nouvelle image à telecharger*/
		if (i === this.images.length - 1) {
			i = -1
		}
		this.loadImage(this.images[i + 1]);/*chargé la nouvelle image*/
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

    //html part
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

