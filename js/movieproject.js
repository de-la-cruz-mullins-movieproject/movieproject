// 'use strict';

$(document).ready(function () {

    setTimeout(function () {
        loadMovies();
    }, 2000);

    function loadMovies() {
        $('#movieContainer').html('');
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
                                <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
                                <p class="card-text">${movie.Plot}</p>
                                <p class="card-text">Ratings: ${movie.Ratings[0].Value}</p>
                                <p class="card-text"> Genre: ${movie.Genre}</p>
                            </div>
                    </div>
                </div>`)
                })
            })
        })
    }


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
    // deleteMovie(9);
    // deleteMovie(10);

    function addMovie() {
        let newMovie = {
            Title: $('#movie-title').val(),
            Year: $('#year-released').val(),
            Ratings: [
                {
                    Value: $('#movie-rating').val()
                }
            ],
            Genre: $('#movie-genre').val(),
            Plot: $('#movie-description').val(),
            Poster: 'https://placeholder.pics/svg/1000x1000'
        }
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
        setTimeout(function (){
            loadMovies();
        }, 1000)
    }

    $('#createNewMovie').click(function (e) {
        e.preventDefault();
        addMovie();
    })

    //modal functions
    const exampleModal = document.getElementById('exampleModal')
    exampleModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const recipient = button.getAttribute('data-bs-whatever')
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        const modalTitle = exampleModal.querySelector('.modal-title')
        const modalBodyInput = exampleModal.querySelector('.modal-body input')

        modalTitle.textContent = `New Movie`
        modalBodyInput.value = recipient
    })
})
