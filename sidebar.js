function createSidebar() {
  const sidebarContainer = document.querySelector("#sidebar");

  // Obtener las claves del Local Storage
  const keys = Object.keys(localStorage);

  // Limpiar el contenido anterior del sidebar
  sidebarContainer.innerHTML = '';

  // Recorrer las claves y crear un elemento para cada receta
  keys.forEach(key => {
    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipe");

    // Agregar el nombre de la receta como título
    const title = document.createElement("h2");
    title.textContent = key;
    recipeContainer.appendChild(title);

    // Agregar los ingredientes como una lista
    const ingredientsList = document.createElement("ul");
    const ingredients = JSON.parse(localStorage.getItem(key));
    ingredients.forEach(ingredient => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient;
      ingredientsList.appendChild(listItem);
    });
    recipeContainer.appendChild(ingredientsList);

    // Agregar un botón para eliminar la receta de favoritos
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      // Eliminar los ingredientes del Local Storage
      localStorage.removeItem(key);

      // Actualizar la lista de recetas
      createSidebar();
    });
    recipeContainer.appendChild(deleteButton);

    sidebarContainer.appendChild(recipeContainer);
  });
}
  
  // Llamar a la función para crear el sidebar
  createSidebar();


  function toggleFavorites() {
    const favoritesContainer = document.getElementById("favorites-container");
    favoritesContainer.classList.toggle("hidden");
  
    // Si el contenedor de favoritos se muestra, actualizar la lista
    if (!favoritesContainer.classList.contains("hidden")) {
      createSidebar();
    }
  }
  
  // Agregar evento click al botón de favoritos
  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.addEventListener("click", toggleFavorites);


