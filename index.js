//Pokemon Name Data

const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
fetch(url)
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => getsPokemonNames(data))
.catch(error => {
    console.error('Error fetching data:', error);
});

//Grabs all the names of the Pokemon from the API
function getsPokemonNames(data) {
    const pokemonNames = []
    for(item of data['results']) {
        pokemonNames.push(item['name'])
    }
    console.log(pokemonNames.length)
}


  


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
    const randomBtn = document.querySelector("#random-btn")

    //Adds an event listener on the search bar button 
    searchBarForm.addEventListener("submit", handleSubmit)

    //Adds an event listener on the random button
    randomBtn.addEventListener("click", event => {
        console.log(event)
    })
})

 