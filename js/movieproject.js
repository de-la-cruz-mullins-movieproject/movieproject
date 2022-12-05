'use strict';

$(document).ready(function () {

    console.log("ran")

    fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
        console.log("ran");
        response.json().then((data) => {
            console.log(data);
            data.forEach((movie) => {
                console.log(movie);
                $('#movieContainer').append(`<div class="d-flex flex-column" id="movie"><img src="" alt=""><h5><span id="movieTitle"></span></h5><p><span id="movieDesc"></span></p></div>`)
            })
        })
    })
})


