const jokeList = $('#jokeList')
const favoritesList = $('#favoritesList')
const searchInput = $('#searchInput')
const searchButton = $('#searchBtn')
const randomJokeBtn = $('#randomJokeBtn')
let pageCount = 1

function requestJokes(searchTerm, pageCount) {
    $('#jokeLabel').text('JOKES')
    // Set the Accept header to request JSON data
    $.get(`https://icanhazdadjoke.com/search?term=${searchTerm}&page=${pageCount}`, (data) => {
        // console.log(data.next_page); Access the array of jokes in the response
        addJokesToJokeList(data.results)
    }, "json")
}

// Get a random joke and display in the list
function getRandomJoke() {
    $.get('https://icanhazdadjoke.com/', (data) => {
        //console.log(data.joke);
        const joke = data.joke
        addJokesToJokeList([{ joke }])
    }, 'json')
    $('#jokeLabel').text('JOKE')
}

randomJokeBtn.on('click', getRandomJoke);

// iterate over the array of joke objects and add each to list
function addJokesToJokeList(arrayOfJokes) {
    //clear joke list before adding new jokes
    jokeList.empty()
    arrayOfJokes.forEach(jokeObj => {
        const listItem = $('<li>').text(jokeObj.joke);
        jokeList.append(listItem)
        listItem.on('click', () => {
            addJokeToFavorites(jokeObj)
            listItem.remove()
        });
    });
}

// add the joke from the list to the favorites list
function addJokeToFavorites(jokeObj) {

    const listItem = $('<li>').text(jokeObj.joke)
    favoritesList.append(listItem)
    listItem.on('click', () => {
        jokeList.append(jokeObj)
        listItem.remove()
    });
}

function searchValue(){
    const searchTerm = searchInput.val()
    if (searchTerm) {
        requestJokes(searchTerm)
    } else requestJokes(searchTerm, (pageCount < 39 ? pageCount++ : pageCount = 1))
}

// Get jokes based on the search term or top 20 jokes if no input
searchButton.on('click', searchValue)

// can press Enter key or click
searchInput.on('keypress', (event) => {
    if (event.key === 'Enter') {
        searchValue()
    }
});

const menuBtn = $('.menuBtn')
const nav = $('nav')

menuBtn.on('click', () => {
    nav.toggleClass('active')
})