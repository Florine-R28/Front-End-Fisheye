//create a function for the total likes
// eslint-disable-next-line no-unused-vars
function updateTotalLikes(updateType) {
    const totalLikesGlobal = document.getElementById("totalLikesGlobal");
    if (updateType === "add"){
        totalLikesGlobal.innerText = (parseInt(totalLikesGlobal.innerText, 10) + 1).toString(); 
    } else {
        totalLikesGlobal.innerText = (parseInt(totalLikesGlobal.innerText, 10) - 1).toString();
}}
