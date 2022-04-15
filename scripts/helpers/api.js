//get the data fish (photographers & medias)
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let url = `data/photographers.json`; /*emplacment du ficher, ex adresse*/
    let response = await fetch(url);/*utilisation de la fonction fetch pour recup les données avec une adresse, stocke dans response*/
    let result = await response.json(); /*formatage les données pour etre lisible*/
    /*console.log(result) les données sont dasn résult*/
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers:result.photographers,
        medias:result.media,
    })
}