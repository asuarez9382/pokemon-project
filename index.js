//Renders one pokemon to the DOM
function renderPokemon(data) {
    const name = data['name'];
    const type = data["types"]["0"]["type"]["name"];
    const image = data["sprites"]["other"]["official-artwork"]["front_default"]

    console.log(data)
    console.log(name)
    console.log(type)
    console.log(image)

    const pokemonCard = document.createElement("li")
    pokemonCard.id = "pokemon-card"
    pokemonCard.innerHTML = `
        <img src=${image} />
        <h3>${name}</h3>
        <h4>${type}</h4>
    `

    const pokemonList = document.querySelector("#pokemon-list")
    pokemonList.appendChild(pokemonCard)
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

 