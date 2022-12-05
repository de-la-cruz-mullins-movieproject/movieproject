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
                                <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
                                <p class="card-text"> Description: ${movie.Plot}</p>
                                <p class="card-text">Ratings: ${movie.Ratings[0].Value}</p>
                                <p class="card-text"> Genre: ${movie.Genre}</p>


                            </div>
                    </div>`,)
                     })
        })
    })
})
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



