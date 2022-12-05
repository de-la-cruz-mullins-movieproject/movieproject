// 'use strict';

$(document).ready(function () {
    setTimeout(function () {
        fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
            $('.loader').addClass('d-none');
            response.json().then((data) => {
                console.log(data);
                data.forEach((movie) => {
                    $('#movieContainer').append(
                        `<div class=" d-flex col-2" id="movie">
                    <div class="card" style="width: 30rem;" >
                        <img src="${movie.Poster}" class="card-img-top" alt="poster">
                            <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <p class="card-text">${movie.Plot}</p>
                            </div>
                    </div>
                </div>`)
                })
            })
        })
    }, 2000);


    const apiKey = 'd684bbda';

    //function searches OMDB for a movie and then populates glitch with results
    function searchMovie(movie) {
        fetch(`http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}&`).then((response) => {
            response.json().then((data) => {
                let newMovie = data;
                const url = 'https://green-peppermint-quarter.glitch.me/movies';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMovie)
                };
                fetch(url, options)
                    .then(response => response.json()).then(data => console.log(data)) /* review was created successfully */
                    .catch(error => console.error(error)); /* handle errors */
            })
        })
    }

    function deleteMovie(id) {
        fetch('https://green-peppermint-quarter.glitch.me/movies/' + id).then((response) => {
            response.json().then((data) => {
                console.log(data);
                // let filteredMovie = data.filter(function(movie){
                //     return movie.id === 1;
                // })
                // console.log(filteredMovie);
                const url = 'https://green-peppermint-quarter.glitch.me/movies/' + id;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                fetch(url, options)
                    .then(response => response.json()).then(data => console.log(data)) /* review was created successfully */
                    .catch(error => console.error(error)); /* handle errors */
            })
        })
    }
})
