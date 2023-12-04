

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
    .then(data => {
        console.log(data) 
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const searchBarForm = document.querySelector("#search-bar-form")

    //Adds an event listener on the search bar button 
    searchBarForm.addEventListener("submit", handleSubmit)
})

 