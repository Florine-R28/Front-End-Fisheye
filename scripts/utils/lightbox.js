//@property {HTMLElement} element

class Lightbox {

    static init() {
        const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]')
            links.forEach(link => link.addEventListener('click', e => {
                e.preventDefault(
                new Lightbox(e.currentTarget.getAttribute('href'))
                )
            }))
    }

    //@param {string} url URL de l'image
    constructor(url) {
        const element = this.buildDOM(url)
        document.body.appendChild(element)
    }

    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
    }

    //@param {string} url URL de l'image
    //@return{HTMLElement}

    buildDOM (url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox_close" aria-label="fermer">Fermer</button>
        <button class="lightbox_next" aria-label="suivant">Suivant</button>
        <button class="lightbox_prev" aria-label="precedent">Précédent</button>
        <div class="lightbox_container">
          <img src="${url}" alt="">
        </div>`
        dom.querySelector('.lightbox_close').addEventListener('click', this.close.bind(this))
        return dom
    }

}

    //<div class="lightbox" role='dialog'>
    //  <button class="lightbox_close" aria-label="fermer">Fermer</button>
    //  <button class="lightbox_next" aria-label="suivant">Suivant</button>
    //  <button class="lightbox_prev" aria-label="precedent">Précédent</button>
    //  <div class="lightbox_container">
    //    <img class="photo_gallery" src="assets/Sample Photos/Mimi/Animals_Rainbow.jpg"/>
    //  </div>
    //</div>


Lightbox.init ()