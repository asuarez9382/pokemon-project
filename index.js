//Renders one pokemon to the DOM
function renderPokemon(data) {
    console.log(data)
    console.log(data['name'])
    console.log(data["types"]["0"]["type"]["name"])
    console.log(data["sprites"]["other"]["official-artwork"]["front_default"])
}

//handles the submit event by taking the user input and doing a get request to the api
function handleSubmit(event) {
    event.preventDefault()
    const userInput = document.querySelector("#search-bar")
    const url = `https://pokeapi.co/api/v2/pokemon/${userInput.value}`
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => renderPokemon(data))
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const searchBarForm = document.querySelector("#search-bar-form")

    //Adds an event listener on the search bar button 
    searchBarForm.addEventListener("submit", handleSubmit)
})

 