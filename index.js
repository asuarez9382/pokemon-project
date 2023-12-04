/*const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

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
*/

function handleSubmit(event) {
    event.preventDefault()
    const userInput = document.querySelector("#search-bar")
    console.log(userInput.value)
}

document.addEventListener("DOMContentLoaded", function() {
    const searchBarForm = document.querySelector("#search-bar-form")

    searchBarForm.addEventListener("submit", handleSubmit)
})

 