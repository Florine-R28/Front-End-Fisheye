//get data file in json (photographers & medias)
// eslint-disable-next-line no-unused-vars
async function getPhotographers() {
    let url = `data/photographers.json`; 
    let response = await fetch(url);
    let result = await response.json(); 
    
    //flip the array
    return ({
        photographers:result.photographers,
        medias:result.media,
    })
}