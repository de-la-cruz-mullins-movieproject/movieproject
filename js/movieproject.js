'use strict';

$(document).ready(function () {

    console.log("ran")

    fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
        console.log("ran");
        response.json().then((data) => {
            console.log(data);
            data.forEach((movie) => {
                console.log(movie);
                $('#movieContainer').append(`<div class="col-2" id="movie"><img src="${movie.Poster}" alt=""><h5>${movie.Title}</h5><p>${movie.Plot}</p></div>`)
            })
        })
    })
})


