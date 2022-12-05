'use strict';

$(document).ready(function () {


    fetch('https://green-peppermint-quarter.glitch.me/movies').then((response) => {
        response.json().then((data) => {
            console.log(data);
        })
    })
})


