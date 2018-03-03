"use strict";
console.log("foodie-list.js");

let firebase = "https://exercisedb-20924.firebaseio.com/foodie/",
    $ = require('jquery'),
    fbCalls = require("./firebase-calls"),
    adding = require("./add-form");

$("#addRest").css({
    "cursor": "pointer"
});
$("#addRest").on("click", adding.formPage);

//Initial state of the app
let showSortedRestaurants = () => {
    //get data from FB and sort based on rating
    fbCalls.getData(`${firebase}restaurants.json`)
        .then((data) => {
            let ratings = [];
            let keys = Object.keys(data);
            keys.forEach((item) => {
                let listItem = data[item];
                ratings.push([listItem.restaurant, listItem.my_rating]);
            });
            ratings.sort((a, b) => {
                return b[1] - a[1];
            });

            //Begin DOM Manipulation
            $(".container").html("");

            //Carousel on Home Page
            let homepageImgs = ["./images/hp1.jpg", "./images/hp2.jpeg", "./images/hp3.jpeg"];

            homepageImgs.forEach((img, index) => {
                if (index === 0) {
                    $(".carousel-inner").append(`
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="${img}" alt="Foodie">
                    </div>`);
                } else {
                    $(".carousel-inner").append(`
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${img}" alt="Foodie">
                    </div>`);
                }
            });

            //Restaurant List
            $(".container").append(`<ul class="list-group">`);
            $(".list-group").append(`<li class="list-group-item     list-group-item-secondary d-flex justify-content-between align-items-center">
            <h5>Restaurant Name<h5>
            <span class="badge badge-primary badge-pill">Rating</span>
            </li>`);
            ratings.forEach((rest) => {
                $(".list-group").append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                ${rest[0]}
                <span class="badge badge-primary badge-pill">${rest[1]}</span>
                </li>
                `);
            });
            $(".container").append(`</ul>`);
        });
};

module.exports = {
    showSortedRestaurants
};
// Add a way for a user to filter restaurants by rating.