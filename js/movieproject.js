// 'use strict';

$(document).ready(() => {

    setTimeout(() => {
        loadMovies();
    }, 2000);

    function loadMovies() {
        let currentMovies = [];
        $('#movieContainer').html('');
        fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
            $('.loader').addClass('d-none');
            response.json().then((data) => {
                console.log(data);
                data.forEach((movie) => {
                    currentMovies.push(movie);
                })
                filterMovies(currentMovies);
            })
        })
    }

    function filterMovies(currentMovies) {
        let filteredMovies = [];
        // let userSearchName = $('#userSearchName').val();
        // let userSearchGenre = $('#userSearchGenre').val();
        // let userSearchYear = $('#userSearchYear'').val();
        let userSearchName = '';
        let userSearchGenre = '';
        let userSearchYear = '';
        currentMovies.filter((movie) => {
            if (movie.Title.toLowerCase().includes(userSearchName.toLowerCase()) || (movie.Genre.toLowerCase().includes(userSearchGenre.toLowerCase())) || (movie.Year.includes(userSearchYear))) {
                filteredMovies.push(movie);
            }
        })
        createMovieCards(filteredMovies);
    }

    function createMovieCards(filteredMovies) {
        $('#movieContainer').html(' ');
        filteredMovies.forEach((movie) => {
            $('#movieContainer').append(
                `<div class=" d-flex col-2" id="movie">
                    <div class="card" style="width: 30rem;" >
                        <img src="${movie.Poster}" class="card-img-top" alt="poster">
                            <div class="card-body">
                                <h5 className="card-title">${movie.Title} (${movie.Year}) </h5>
                                <p class="card-text">${movie.Plot}</p>
                                <p class="card-text">Ratings: ${movie.Ratings[0].Value}</p>
                                <p class="card-text"> Genre: ${movie.Genre}</p>
                                <div class="card-icons" style="width: 60px">
                                <button type="button" class="btn btn-warning editButton"> 
                                <div class="modal-dialog modal-lg">
                                Edit <i class="bi bi-pencil-square "></i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="0" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</div>
</button>
<button type="submit" class="btn btn-danger deleteButton" value="${movie.id}">Delete 
<i class="bi bi-trash3"></i>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
</button>
</div>

                    </div>
                </div>`)
        })
    }

    function editMovie(id) {
        fetch('https://green-peppermint-quarter.glitch.me/movies/' + id).then((response) => {
            response.json().then((data) => {
                console.log(data);
                const url = 'https://green-peppermint-quarter.glitch.me/movies/' + id;
                const options = {
                    method: 'PATCH',
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

    $('.movieSearch').click(function (e) {
        e.preventDefault();
        searchMovie($('.movieSearchBar').val());
        setTimeout(function () {
            loadMovies();
        }, 1000)
    })

    $("#deleteButton").click(function (e) {
        e.preventDefault();
        console.log('ran delete function')
        deleteMovie($('.deleteButton').val());
        setTimeout(() => {
            loadMovies();
        }, 1000);
    })

    $('.editButton').click(function(e){
        console.log("edit button");
    })


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
        setTimeout(function () {
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

