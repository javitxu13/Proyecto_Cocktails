function startloading (){
    let imgSection = document.createElement("section");
    imgSection.id = "loadImage"
    let img = document.createElement("img");
    img.src = "coctail.gif";
    imgSection.appendChild(img)
    document.getElementById("cocktail-list").appendChild(imgSection);
    
}

function endLoading(){
    let image = document.getElementById("loadImage");
    image.remove();
}

export async function createMenu(){
    startloading();
    await getCoctails();
    endLoading();
}