//import{getRecipes,addRecipe,deleteRecipe} from "prueba/menu.js";

document.getElementById("Button_Cocktails").addEventListener("click", search);

function search(event) {
    let text = document.getElementById("Buscar").value.trim();
    if (text === "") return;
    let textEncoded = encodeURIComponent(text);
    let boton = event.target;
    let type = boton.id;

    const input = document.getElementById('Buscar');
    const list = document.getElementById('miLista').getElementsByTagName('li');


    // Debes reemplazar 'TU_APP_ID' y 'TU_APP_KEY' con tus propias credenciales de Edamam
    const appId = "d7f49d17";
    const appKey = "7cff386d045e146254ba9231a5d3ea3d";
    const cuisineType = "Caribbean";
    const dishType = "Drinks";


    // Construir la URL de la API con los parámetros de búsqueda
    const url = `https://api.edamam.com/api/recipes/v2?type=public&cuisineType=Caribbean&dishType=Drinks&app_id=${appId}&app_key=${appKey}&cuisineType=${cuisineType}&dishType=${dishType}&random=true&q=${textEncoded}`;
    console.log(url)
// Realizar una solicitud GET a la API con fetch()
  getCoctails(url)

}


function createImage(url) {
  const img = document.createElement('img');
  img.src = url;
  return img;
}


function getCoctails(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.hits
        .map(cocktail => ({
          name: cocktail.recipe.label,
          image: cocktail.recipe.image,
          ingredients: cocktail.recipe.ingredientLines,
        }))
        .slice(0, 20);
        
      const carouselItems = document.querySelector('.carousel-items');
      const carouselPrev = document.querySelector('.carousel-prev');
      const carouselNext = document.querySelector('.carousel-next');
      let currentIndex = 0;

      cocktails.forEach((cocktail, index) => {
        const carouselItem = document.createElement('div');
        const carouselLink = document.createElement('a');
        const carouselTitle = document.createElement('h3');

        let iconoEstrella = document.createElement("i");
        iconoEstrella.classList.add("fa","fa-heart");
        
      
        const words = cocktail.name.split(' ').slice(0, 5);
        const shortenedName = words.join(' ');
      
        carouselLink.addEventListener('click', (event) => {
          event.preventDefault();
          const ingredientsWindow = window.open('', 'Ingredientes', 'width=500,height=500');
          ingredientsWindow.document.write(`<h2>${shortenedName} Ingredients</h2><p>${cocktail.ingredients.join('<br>')}</p>`);
          ingredientsWindow.document.close();
        
          const buttonHTML = '<button id="myButton">Guardar en favoritos</button>';
          ingredientsWindow.document.querySelector('p').insertAdjacentHTML('afterend', buttonHTML);
        
          // Agregar un evento click al botón
          ingredientsWindow.document.getElementById('myButton').addEventListener('click', () => {
            // Guardar los ingredientes en el Local Storage con una clave única para cada receta
            localStorage.setItem(shortenedName, JSON.stringify(cocktail.ingredients));
            alert('Has guardado la receta a favoritos');
          });
        });
      
        
        
        
        
        

      
        carouselLink.appendChild(createImage(cocktail.image)); 
        carouselTitle.textContent = shortenedName;
      
        // Crear un contenedor para el título y la imagen
        const contentContainer = document.createElement('div');
        contentContainer.className = 'carousel-item-content';
      
        // Agregar el título y la imagen al contenedor
        contentContainer.appendChild(carouselTitle);
        contentContainer.appendChild(carouselLink);
        contentContainer.appendChild(iconoEstrella);
      
        // Agregar el contenedor al elemento de la diapositiva
        carouselItem.appendChild(contentContainer);
      
        carouselItems.appendChild(carouselItem);
      });

      // Agregar eventos para el botón "Prev"
      carouselPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
      });

      // Agregar eventos para el botón "Next"
      carouselNext.addEventListener('click', () => {
        if (currentIndex < cocktails.length - 1) {
          currentIndex++;
          carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
      });
  });
}


/* function filtroClick(url){}

const comboBox = document.createElement("select");
const option1 = document.createElement("option");
const option2 = document.createElement("option");
const option3 = document.createElement("option");


option1.text = "Lemon";
option2.text = "Vodka";
option3.text = "Mojito";


comboBox.add(option1);
comboBox.add(option2);
comboBox.add(option3);


const button = document.createElement("button");
button.textContent = "Filtrar por Ingredientes";
button.addEventListener("click", filtroClick);

document.body.appendChild(comboBox);
document.body.appendChild(button);    */





