//create a function on the total likes
function updateTotalLikes(updateType) {
    const totalLikesGlobal = document.getElementById("totalLikesGlobal");
    if (updateType === "add"){
        totalLikesGlobal.innerText = (parseInt(totalLikesGlobal.innerText, 10) + 1).toString(); 
    } else {
        totalLikesGlobal.innerText = (parseInt(totalLikesGlobal.innerText, 10) - 1).toString();
}}
