let searchTerm = ''

function searchForJokes(searchTerm) {
    // Set the Accept header to request JSON data
    $.get(`https://icanhazdadjoke.com/search?term=${searchTerm}`, (data) => {
        console.log(data.results); // Access the array of jokes in the response
    }, "json");

}
  

searchForJokes(searchTerm)