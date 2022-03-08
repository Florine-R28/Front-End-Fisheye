//get the data fish (photographers & medias)
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let url = `data/photographers.json`;
    let response = await fetch(url);
    let result = await response.json();
    console.log(result)
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers:result.photographers,
        medias:result.media,
    })
}