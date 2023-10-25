const jokeList = $('#jokeList');
const favoritesList = $('#favoritesList');
const searchInput = $('#searchInput');
const searchButton = $('#searchBtn');

function searchForJokes(searchTerm) {
    // Set the Accept header to request JSON data
    $.get(`https://icanhazdadjoke.com/search?term=${searchTerm}`, (data) => {
        console.log(data.results); // Access the array of jokes in the response
        addJokeToJokeList(data.results); // Pass the results to the display function
    }, "json");
}
// iterate over the array of joke objects andadd each to list
function addJokeToJokeList(arrayOfJokes) {
    //clear joke list before adding new jokes
    jokeList.empty(); 
    arrayOfJokes.forEach(jokeObj => {
        const listItem = $('<li>').text(jokeObj.joke);
        jokeList.append(listItem);
        listItem.click(() => addJokeToFavorites(jokeObj));
    });
}

// add the joke from the list to the favorites list
function addJokeToFavorites(jokeObj) {
    const listItem = $('<li>').text(jokeObj.joke);
    favoritesList.append(listItem);
    listItem.click(() => listItem.remove());
}

// Get jokes based on the search term or top 20 jokes if no input
searchButton.click(() => {
    const searchTerm = searchInput.val();
    if (searchTerm) {
        searchForJokes(searchTerm);
    } else searchForJokes('')
});

// can press Enter key or click
searchInput.keypress(function(event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});
