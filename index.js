
//Displays error message
function displayErrorMessage(message) {
    const searchInput = document.getElementById('search-bar');
    const errorMessageContainer = document.getElementById('error-message-container');

    // Create a message element
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
  
    // Clear previous error messages
    
  
    // Append the error message to the Pokemon list container
    errorMessageContainer.appendChild(errorMessage);
  
    // Clear the search input (optional)
    searchInput.value = '';

    const existingErrorMessages = document.querySelector('#error-message-container');
    
    setTimeout(() => {
        existingErrorMessages.querySelector('p').remove();
      }, 3000);
  }

//Grabs all the names of the Pokemon from the API
function getsPokemonNames(data) {
    const pokemonNames = []
    
    //Adds each pokemon object to the pokemonNames list
    data['results'].forEach(item => pokemonNames.push(item))
    renderRandomPokemon(pokemonNames)
}

//Renders 5 random pokemon to the DOM

function renderRandomPokemon(pokemonNames) {
    const shuffledNames = [...pokemonNames].sort(() => Math.random() - 0.5);

    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = ''; // Clear previous entries

    //Loops through the pokemon objects and renders each to the DOM
    for(pokemonObject of shuffledNames.slice(0, 5)) {
        
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonObject['name']}`
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
    
}

 //Renders one pokemon to the DOM
function renderPokemon(data) {
    const name = data['name'];
    const type = data["types"]["0"]["type"]["name"];
    const image = data["sprites"]["other"]["official-artwork"]["front_default"]
    const experience = data["base_experience"]

    const pokemonCard = document.createElement("p")
    pokemonCard.id = "pokemon-card"
    pokemonCard.innerHTML = `
        <div id="pokemon-card-container">
            <h2>${name.toUpperCase()}</h2>
            <img src=${image} />
            <p>TYPE: ${type.toUpperCase()}</p>
            <p>EXPERIENCE: ${experience.toString().toUpperCase()}
            <br>
            <br>
           <button class="delete-btn">Delete</button>
        </div>
    `
    const pokemonList = document.querySelector("#pokemon-list")

    pokemonList.appendChild(pokemonCard)
    
    //Deletes pokemon card from the DOM when delete is clicked
    const deleteBtn = pokemonCard.querySelector(".delete-btn")

    deleteBtn.addEventListener("click", () => {
        pokemonCard.remove()

    } )

    //Changes color to delete button when moused over
    deleteBtn.addEventListener('mouseover', function () {
        deleteBtn.style.backgroundColor = '#3D7DCA'
    });

    //Changes color back to delete button when moused out
    deleteBtn.addEventListener('mouseout', function () {
        deleteBtn.style.backgroundColor = ''
    });

    
    
}

//Handlers

//handles the click event by randomly choosing 5 pokemon
function handleClick(event) {

    //GETs all the pokemon from the API
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
}

//handles the submit event by taking the user input and doing a get request to the api
function handleSubmit(event) {
    event.preventDefault()
    const userInput = document.querySelector("#search-bar")
    const url = `https://pokeapi.co/api/v2/pokemon/${userInput.value}`
    fetch(url)
    .then(response => {
        if (!response.ok) {
            displayErrorMessage('Invalid Pokemon name. Please enter a valid name.');
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
    const searchBtn = document.querySelector("#search-btn")

    //Adds an event listener on the search bar button 
    searchBarForm.addEventListener("submit", handleSubmit)

    //Adds an event listener on the random button
    randomBtn.addEventListener("click", handleClick)

    //Changes color to random button when moused over
    randomBtn.addEventListener('mouseover', function () {
        randomBtn.style.backgroundColor = '#3D7DCA';
    });
    
    //Changes color back to random button when moused out
    randomBtn.addEventListener('mouseout', function () {
        randomBtn.style.backgroundColor = ''; // Reset to the default background color
    });

    //Changes color to search button when moused over
    searchBtn.addEventListener('mouseover', function () {
        searchBtn.style.backgroundColor = '#3D7DCA';
    });

    //Changes color back to search button when moused out
    searchBtn.addEventListener('mouseout', function () {
        searchBtn.style.backgroundColor = '';
    });
      

})

 