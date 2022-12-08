// 'use strict';
$(document).ready(() => {
    //2-second timer that enables loading spinner to show before data populates
    setTimeout(() => {
        loadMovies();
    }, 5000);
    //starts movie population process - removes loader - fetch request for movies in glitch database and then adds ratings value if none is present
    function loadMovies() {
        let currentMovies = [];
        $('#movieContainer').html('');
        fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
            $('.loader').addClass('d-none');
            $('nav').removeClass('d-none');
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
    //filters current movies based on user input into filter fields
    function filterMovies(currentMovies) {
        let userSearchName = $('.userSearchName').val();
        let userSearchGenre = $('.genreDropdown').val();
        let userRating = $('.ratingDropdown').val();
        let filteredMovies = currentMovies.filter((movie) => {
            return movie.Title.toLowerCase().includes(userSearchName.toLowerCase()) && (movie.Genre.includes(userSearchGenre)) && (movie.Ratings[0].Value >= userRating)
        })
        createMovieCards(filteredMovies);
    }
    $('.filterButton').click(() => $('.filter').toggleClass('d-none'));
    //runs loadMovies function when user changes filter fields
    $('.genreDropdown').change(() => loadMovies());
    $('.userSearchName').keyup(() => loadMovies());
    $('.ratingDropdown').change(() => loadMovies());
    //takes in array after the movies are filtered and populates the cards
    function createMovieCards(filteredMovies) {
        filteredMovies.forEach((movie) => {
            $('#movieContainer').append(
                `<div class="modal fade" id="movie${movie.id}" tabindex="0" aria-labelledby="exampleModalLabel"
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
                                            <span class="input-group-text" id="basic-addon1">Title</span>
                                            <input type="text"
                                                   class="form-control movieTitleEdit${movie.id}"
                                                   aria-describedby="basic-addon1"
                                                   value="${movie.Title}">
                                        </div>
                                        <div class="input-group">
                                            <span class="input-group-text">Plot</span>
                                            <textarea class="form-control moviePlotEdit${movie.id}"
                                                    aria-label="With textarea"></textarea>
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text" id="basic-addon1">Ratings</span>
                                            <input type="text"
                                                   class="form-control movieRatingsEdit${movie.id}"
                                                   aria-describedby="basic-addon1"
                                                   value="${movie.Ratings[0].Value}">
                                        </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text" id="basic-addon1">Genre</span>
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
    <div class="d-flex col-2 m-2" id="movie" style="height: 450px; width: 300px;">
        <div class="card rounded" style="width: 30rem;" >
            <div class="flip-card rounded border border-4 borderBlack">
                <div class="flip-card-inner rounded border border-4 borderBlack">
                    <div class="flip-card-front rounded border border-4 borderBlack">
                        <img src="${movie.Poster}" class="card-img-top" alt="poster">
                    </div>
                    <div class="flip-card-back rounded border border-4 borderBlack d-flex flex-column justify-content-around">
                        <h4 class="card-title"><span class="bold">${movie.Title} (${movie.Year})</span></h4>
                        <p class="card-text fs-5">${movie.Plot}</p>
                        <p class="card-text fs-5"><span class="bold">Ratings: </span>${movie.Ratings[0].Value}</p>
                        <p class="card-text fs-5"><span class="bold">Genre: </span>${movie.Genre}</p>
                        <div class="card-icons">
                            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#movie${movie.id}">
                                Edit 
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="submit" class="btn deleteButton btn-dark" value="${movie.id}">
                                Delete 
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </div>`);
            $(".moviePlotEdit" + movie.id).append(`${movie.Plot}`);
        })
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
            }, 800);
        })
        $(`.deleteButton`).click(function (e) {
            e.preventDefault();
            deleteMovie(this.value);
            setTimeout(() => {
                loadMovies();
            }, 800);
        })
    }
    //sends patch request to glicth based on user inputs into card modal
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
    //runs omdb search function on button click
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
    //sends delete request when user clicks delete button
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
    //inputs custom movie into glitch database based on user inputs into modal
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
        }, 400)
    }
    //runs create function when button is clicked
    $('#createNewMovie').click((e) => {
        e.preventDefault();
        addMovie();
    })
})
