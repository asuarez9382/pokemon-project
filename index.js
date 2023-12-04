//Renders one pokemon to the DOM
function renderPokemon(data) {
    const name = data['name'];
    const type = data["types"]["0"]["type"]["name"];
    const image = data["sprites"]["other"]["official-artwork"]["front_default"]
    const experience = data["base_experience"]

    console.log(data)
    console.log(name)
    console.log(type)
    console.log(image)
    console.log(experience)

    const pokemonCard = document.createElement("p")
    pokemonCard.id = "pokemon-card"
    pokemonCard.innerHTML = `
        <div id="pokemon-card-container">
            <h2>${name.toUpperCase()}</h2>
            <img src=${image} />
            <p>TYPE: ${type.toUpperCase()}</p>
            <p>EXPERIENCE: ${experience.toString().toUpperCase()}
            
        </div>
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

 