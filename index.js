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

const searchBtn = document.querySelector("#search-btn")
searchBtn.addEventListener("click", event => {
    event.preventDefault()
    console.log(event)
})
 