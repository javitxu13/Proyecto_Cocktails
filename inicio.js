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

/* function getCoctails(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.hits
        .map(cocktail => ({
          name: cocktail.recipe.label,
          image: cocktail.recipe.image,
          ingredients: cocktail.recipe.ingredientLines,
        }))
        .slice(0, 10);
        
      const cocktailList = document.getElementById('cocktail-list');

      cocktails.forEach(cocktail => {
        const cocktailItem = document.createElement('div');
        const cocktailName = document.createElement('h2');
        const cocktailImage = document.createElement('img');
        const cocktailLink = document.createElement('a'); // Nuevo

        const words = cocktail.name.split(' ').slice(0, 3);
        const shortenedName = words.join(' ');

        cocktailName.textContent = shortenedName;
        cocktailImage.src = cocktail.image;

        // Agregar el evento click al elemento "a"
        cocktailLink.addEventListener('click', (event) => {
          event.preventDefault();
          const ingredientsWindow = window.open('', 'Ingredientes', 'width=500,height=500');
          ingredientsWindow.document.write(`<h2>${shortenedName} Ingredients</h2><p>${cocktail.ingredients.join('<br>')}</p>`);
          ingredientsWindow.document.close();
        });

        cocktailLink.appendChild(cocktailImage);
        cocktailItem.appendChild(cocktailName);
        cocktailItem.appendChild(cocktailLink); // Modificado
        cocktailList.appendChild(cocktailItem);
      });
    });
} */

/* function filtroClick(){}

const comboBox = document.createElement("select");
const option1 = document.createElement("option");
const option2 = document.createElement("option");
const option3 = document.createElement("option");


option1.text = "1 palabra";
option2.text = "2 palabras";
option3.text = "3 palabras";


comboBox.add(option1);
comboBox.add(option2);
comboBox.add(option3);


const button = document.createElement("button");
button.textContent = "Filtrar por palabras";
button.addEventListener("click", filtroClick);

document.body.appendChild(comboBox);
document.body.appendChild(button);   */


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
        .slice(0, 10);
        
      const carouselItems = document.querySelector('.carousel-items');
      const carouselPrev = document.querySelector('.carousel-prev');
      const carouselNext = document.querySelector('.carousel-next');

      cocktails.forEach(cocktail => {
        const carouselItem = document.createElement('div');
        const carouselLink = document.createElement('a');
        const carouselTitle = document.createElement('h3');
      
        const words = cocktail.name.split(' ').slice(0, 3);
        const shortenedName = words.join(' ');
      
        carouselLink.addEventListener('click', (event) => {
          event.preventDefault();
          const ingredientsWindow = window.open('', 'Ingredientes', 'width=500,height=500');
          ingredientsWindow.document.write(`<h2>${shortenedName} Ingredients</h2><p>${cocktail.ingredients.join('<br>')}</p>`);
          ingredientsWindow.document.close();
        });
      
        carouselLink.appendChild(createImage(cocktail.image));
        carouselTitle.textContent = shortenedName;
      
        // Crear un contenedor para el título y la imagen
        const contentContainer = document.createElement('div');
        contentContainer.className = 'carousel-item-content';
      
        // Agregar el título y la imagen al contenedor
        contentContainer.appendChild(carouselTitle);
        contentContainer.appendChild(carouselLink);
      
        // Agregar el contenedor al elemento de la diapositiva
        carouselItem.appendChild(contentContainer);
      
        carouselItems.appendChild(carouselItem);
      });

      $('.carousel-items').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: carouselPrev,
        nextArrow: carouselNext,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });

      // Agregar controladores de eventos de clic para los botones de anterior y siguiente
      $('.carousel-prev').click(() => {
        $('.carousel-items').slick('slickPrev');
      });

      $('.carousel-next').click(() => {
        $('.carousel-items').slick('slickNext');
      });
    });
}