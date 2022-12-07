// 'use strict';

$(document).ready(() => {

    //2-second timer that enables loading spinner to show before data populates
    setTimeout(() => {
        loadMovies();
    }, 2000);


    //starts movie population process - removes loader - fetch request for movies in glitch database and then adds ratings value if none is present
    function loadMovies() {
        let currentMovies = [];
        $('#movieContainer').html('');
        fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
            $('.loader').addClass('d-none');
            response.json().then((data) => {
                console.log(data);
                data.forEach((movie) => {
                    if (movie.Ratings.hasOwnProperty('Value')) {
                        currentMovies.push(movie);
                    } else {
                        movie.Ratings.push({Value: '0/0'});
                        currentMovies.push(movie);
                    }
                })
                filterMovies(currentMovies);
            })
        })
    }

    function filterMovies(currentMovies) {
        let userSearchName = $('.userSearchName').val();
        let userSearchGenre = $('.genreDropdown').val();
        let userRating = $('.ratingDropdown').val();
        let filteredMovies = currentMovies.filter((movie) => {
            return movie.Title.toLowerCase().includes(userSearchName.toLowerCase()) && (movie.Genre.includes(userSearchGenre)) && (movie.Ratings[0].Value >= userRating)
        })
        createMovieCards(filteredMovies);
    }

    $('.genreDropdown').change(() => loadMovies());
    $('.userSearchName').keyup(() => loadMovies());
    $('.ratingDropdown').change(() => loadMovies());

    function createMovieCards(filteredMovies) {
        filteredMovies.forEach((movie) => {
            $('#movieContainer').append(
                `    <div class="modal fade" id="movie${movie.id}" tabindex="0" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${movie.Title}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="input-group mb-3">
                                                                                        <span class="input-group-text"
                                                                                              id="basic-addon1">Title</span>
                                            <input type="text"
                                                   class="form-control movieTitleEdit${movie.id}"
                                                   aria-describedby="basic-addon1"
                                                   value="${movie.Title}">
                                        </div>
                                        <div class="input-group">
                                                                                                            <span
                                                                                                                    class="input-group-text">Plot</span>
                                            <textarea
                                                    class="form-control moviePlotEdit${movie.id}"
                                                    aria-label="With textarea"></textarea>
                                        </div>
                                        <div class="input-group mb-3">
                                                                                        <span class="input-group-text"
                                                                                              id="basic-addon1">Ratings</span>
                                            <input type="text"
                                                   class="form-control movieRatingsEdit${movie.id}"
                                                   aria-describedby="basic-addon1"
                                                   value="${movie.Ratings[0].Value}">
                                        </div>
                                        <div class="input-group mb-3">
                                                                                        <span class="input-group-text"
                                                                                              id="basic-addon1">Genre</span>
                                            <input type="text"
                                                   class="form-control movieGenreEdit${movie.id}"
                                                   aria-describedby="basic-addon1"
                                                   value="${movie.Genre}">
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button"
                                                class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                        <button
                                                class="btn btn-primary submitEdits"
                                                value="${movie.id}"
                                                data-bs-dismiss="modal">Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    <div class=" d-flex col-2" id="movie" style="height: 450px; width: 300px;">
        <div class="card" style="width: 30rem;" >
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="${movie.Poster}" class="card-img-top" alt="poster">
                    </div>
                    <div class="flip-card-back">
                        <h5 class="card-title">${movie.Title} (${movie.Year}) </h5>
                        <p class="card-text">${movie.Plot}</p>
                        <p class="card-text">Ratings: ${movie.Ratings[0].Value}</p>
                        <p class="card-text"> Genre: ${movie.Genre}</p>
                        <div class="card-icons">
                            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#movie${movie.id}">
                                Edit
                            </button>
                            <button type="submit" class="btn deleteButton btn-dark" value="${movie.id}">
                                Delete
                                <i class="bi bi-trash3"></i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                     height="20"
                                     fill="currentColor" class="bi bi-trash3"
                                     viewBox="0 0 16 16">
                                    <path
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </div>`);

            $(".moviePlotEdit" + movie.id).append(`${movie.Plot}`);
            $('.submitEdits').click(function (e) {
                e.preventDefault();
                let data = {
                    Title: $('.movieTitleEdit' + this.value).val(),
                    Ratings: [{Value: $('.movieRatingsEdit' + this.value).val()}],
                    Plot: $('.moviePlotEdit' + this.value).val(),
                    Genre: $('.movieGenreEdit' + this.value).val()
                };
                editMovie(data, this.value);
                setTimeout(() => {
                    loadMovies();
                }, 1000);
            })
        })
        $(`.deleteButton`).click(function (e) {
            e.preventDefault();
            deleteMovie(this.value);
            setTimeout(() => {
                loadMovies();
            }, 1000);
        })
    }

    function editMovie(data, id) {
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
    }


    const apiKey = 'd684bbda';

    //function searches OMDB for a movie and then populates glitch with results
    function searchMovie(movie) {
        fetch(`http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}&`).then((response) => {
            response.json().then((data) => {
                console.log(data)
                let newMovie = data;
                const url = 'https://green-peppermint-quarter.glitch.me/movies';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMovie)
                };
                if (data.Response === 'True') {
                    console.log('TRUE')
                    fetch(url, options)
                        .then(response => response.json()).then(data => console.log(data)) /* review was created successfully */
                        .catch(error => console.error(error)); /* handle errors */
                }
            })
        }).catch(error => console.error(error))
    }

    $('.movieSearch').click(function (e) {
        e.preventDefault();
        searchMovie($('.movieSearchBar').val());
        setTimeout(function () {
            loadMovies();
        }, 1000)
    })
    $('.editButton').click(function (e) {
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

    // deleteMovie(30);
    // deleteMovie(28);
    // deleteMovie(29);


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
})