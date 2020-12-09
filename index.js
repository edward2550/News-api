'use strict';

const apiKey ='';

const searchUrl = '';


function formatQuereyParams(params) {
    //create an array of the keys in the "params" object
    const quereyItems = Object.keys(params)
    //for each of the keys in that array, create a string wit the key and the key's value in the "params" objects
    //              q
    .map(key => `${key}=${params[key]}`)
    //return a string of the keys and values, sperated by "&"
    return quereyItems.join("&");
}

function getNews(query, maxResults=10){
    //create the query parameters
    const params = {
        //set the "q" parameter equal to the value the user input
        q: query,
        pageSize:maxResults,
    };
    //create a string with the original URL and the new parameters
    const queryString = formatQuereyParams(params)
    const url = searchUrl + "?" + queryString;

    console.log(url);

    const options = {
        hearders: new Headers({
            "x-rapid-key" : apiKey})
    };
    fetch(url , options){
        .then(response => response.json())
        .then(resoonseJson => console.log(responseJson));
    }
}

//watch for the form submission
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        //capture the value of the user's input
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNews(searchTerm, maxResults);
    });
}

$(watchForm)