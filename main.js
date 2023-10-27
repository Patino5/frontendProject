const jokeList = $('#jokeList')
const favoritesList = $('#favoritesList')
const searchInput = $('#searchInput')
const searchButton = $('#searchBtn')
const randomJokeBtn = $('#randomJokeBtn')
const menuBtn = $('.menuBtn')
const nav = $('nav')
const favoritesCarousel = []
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
        $('#jokeLabel').show()
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
    $('#jokeLabel').show()
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
    favoritesList.prepend(listItem)
    $('#favLabel').show()

    listItem.on('dblclick', () => {
        const blockquote = $('<blockquote>').text(jokeObj.joke)
        blockquote.addClass('quote')
        $('#quoteCarousel').append(blockquote)
        favoritesCarousel.push(blockquote)
        showQuote(favoritesCarousel.length - 1)
        listItem.remove()
    })
}


// search for joke from input and populate list if no value
function searchValue(){
    const searchTerm = searchInput.val()
    if (searchTerm) {
        requestJokes(searchTerm)
    } else requestJokes(searchTerm, (pageCount < 39 ? pageCount++ : pageCount = 1))
}

// event listener for button
searchButton.on('click', searchValue)

// event listener for Enter keypress
searchInput.on('keypress', (event) => {
    if (event.key === 'Enter') {
        searchValue()
    }
});
// menu btn to show favs and carousel
menuBtn.on('click', () => {
    nav.toggleClass('active')    
})

const darkMode = () => {
    $('body').toggleClass('darkMode')
    $('button').toggleClass('darkMode')
    $('li').toggleClass('darkMode')
    $('#searchContainer').toggleClass('darkMode')
    $('.modalContent').toggleClass('darkMode')
    menuBtn.toggleClass('darkMode')
}

const darkBtn = $('#darkBtn')
darkBtn.on('click', darkMode)
const modal = $('#myModal')
const openModal = $('#openModal')
const closeModalBtn = $('#closeModalBtn')
let currentIndex = 0

// Function to show the current quote
function showQuote(index) {
    $('#quoteCarousel blockquote').hide()
    console.log(favoritesCarousel[index]);
    if(favoritesCarousel[index]) favoritesCarousel[index].show()
}

// Event listener to open the modal
openModal.on('click', () => {
    showQuote(favoritesCarousel.length -1)
    modal.show()
})

// Event listener to close the modal
closeModalBtn.on('click', () => {
    modal.hide()
})

// Initial quote display
showQuote(currentIndex);

// Next button click event
$('#nextQuote').on('click', () => {
    currentIndex = (currentIndex + 1) % favoritesCarousel.length
    showQuote(currentIndex)
})
 
// Previous button click event
$('#prevQuote').on('click', () => {
    currentIndex = (currentIndex - 1 + favoritesCarousel.length) % favoritesCarousel.length
    showQuote(currentIndex)
})