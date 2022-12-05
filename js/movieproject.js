'use strict';

$(document).ready(function () {

    console.log("ran")

    fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
        console.log("ran");
        response.json().then((data) => {
            console.log(data);
            data.forEach((movie) => {
                console.log(movie);
                $('#movieContainer').append(
                    `<div class=" d-flex col-2" id="movie">
                    <div class="card" style="width: 30rem;" >
                        <img src="${movie.Poster}" class="card-img-top" alt="poster">
                            <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <p class="card-text">${movie.Plot}</p>
                            </div>
                    </div>`,)
                     })
        })
    })
})




