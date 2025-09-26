"use strict";

/**This is an anon function that will run when the script is loaded 
 * It adds the price tag and favorites button to each dish.
*/
(function () {
    let dishArr = document.querySelectorAll(".dish");

    // Create the favorite button and price tag for each dish.
    for (let index = 0; index < dishArr.length; index++) {
        let favoritesBtn = document.createElement("button");
        favoritesBtn.textContent = "Add to favorites";
        favoritesBtn.classList.add("addfavorite")

        let priceTag = document.createElement("p");
        priceTag.textContent = "$" + dishArr[index].getAttribute("data-price");

        dishArr[index].appendChild(priceTag);
        dishArr[index].appendChild(favoritesBtn);
    }
}) ();

// Add event listeners to all the favorites buttons.
let addFavorites = document.querySelectorAll(".addfavorite");
for (let index = 0; index < addFavorites.length; index++) {
    addFavorites[index].addEventListener("click", addToFavorites);
}

/**This is the callback for clicking an add to favorites button. 
 * It toggles the favorite class on the dish then calls a helper to update the favorites section.
 * @param event - the button click event.
 */
function addToFavorites(event) {

    let currentDish = event.currentTarget.parentNode;

    // Toggle the favorites class and change button text.
    if (currentDish.classList.contains("favorite")) {
        currentDish.classList.remove("favorite");
        event.currentTarget.textContent = "Add to favorites";
    } else {
        currentDish.classList.add("favorite");
        event.currentTarget.textContent = "Remove from favorites";
    }

    updateFavorites();
}

/**This is a helper function for the addToFavorites callback.
 * It creates and updates the favorites section then appends it to the main element to allow it to appear before the closing.
 */
function updateFavorites() {
    let favoritesSection = document.createElement("section");
    favoritesSection.id = "favorites";

    if (document.querySelector("#favorites")) {
        document.querySelector("#favorites").remove();
    }

    favoritesSection.style.backgroundColor = "lightgrey";

    let favoritesHeading = document.createElement("h2");
    favoritesHeading.textContent = "My Favorites";
    
    let favoritesList = document.createElement("ul");
    favoritesList.style.paddingLeft = "0";

    let currentFavorites = document.querySelectorAll(".favorite");

    let total = 0;
    // Populates the list based on current favorites and updates the total.
    for (let index = 0; index < currentFavorites.length; index++) {
        let listItem = document.createElement("li");
        listItem.style.listStyleType = "none";
        listItem.marginBottom = "5px";
        listItem.textContent = currentFavorites[index].getAttribute("data-name") + " $" + currentFavorites[index].getAttribute("data-price");
        
        total += parseFloat(currentFavorites[index].getAttribute("data-price"));
        
        favoritesList.appendChild(listItem);
    }

    let totalPrice = document.createElement("p");
    totalPrice.textContent = "Total: $" + total.toFixed(2);

    favoritesSection.appendChild(favoritesHeading);
    favoritesSection.appendChild(favoritesList);
    favoritesSection.appendChild(totalPrice);
    
    let body = document.querySelector("body");
    if (currentFavorites.length > 0) {
        body.appendChild(favoritesSection);
    }

}