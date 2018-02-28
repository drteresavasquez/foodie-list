"use strict";
console.log("foodie-list.js");

let firebase = "https://exercisedb-20924.firebaseio.com/foodie/";

function getData(file) {
    return $.ajax({
        url: file
    });
}

//Initial state of the app
let showSortedRestaurants = () => {
    //get data from FB and sort based on rating
    getData(`${firebase}restaurants.json`)
        .then((data) => {
            let ratings = [];
            let keys = Object.keys(data);
            keys.forEach((item) => {
                let listItem = data[item]
                ratings.push([listItem.restaurant, listItem.my_rating]);
            });
            ratings.sort((a, b) => {
                return b[1] - a[1];
            });

            //Begin DOM Manipulation
            $(".container").html("");
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
                `)
            });
            $(".container").append(`</ul>`);
        });
}

let changeCity = () => {
    $(".container").html("");
    let url = window.location.href;
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    if (queryString !== undefined) {
        getData(`${firebase}restaurants.json?orderBy="city_id"&equalTo=${queryString}`)
            .then((data) => {
                //Begin DOM Manipulation
                $(".container").html("");
                $(".container").append(`<ul class="list-group">`);
                $(".list-group").append(`<li class="list-group-item     list-group-item-secondary d-flex justify-content-between align-items-center">
                <h5 id="restHeader">Restaurant Name<h5>
                <span class="badge badge-primary badge-pill">Rating</span>
                </li>`);
                let keys = Object.keys(data);
                keys.forEach((item) => {
                    $(".list-group").append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${data[item].restaurant}
                    <span class="badge badge-primary badge-pill">${data[item].my_rating}</span>
                    </li>
                    `)

                    if (data[item].city_id === 7){
                        $("#restHeader").append(" (Hometown)");
                    }
                });
                $(".container").append(`</ul>`);

            });
    } else {
        showSortedRestaurants();
    }
};

let cityDropDown = () => {
    getData(`${firebase}cities.json`)
        .then((data) => {
            let keys = Object.keys(data);
            keys.forEach((item) => {
                let eachCity = data[item];
                $(".dropdown-menu").append(`
            <a class="dropdown-item" href="?${eachCity.id}" id="${eachCity.id}">${eachCity.city}</a>`);
            });
            $(".dropdown-menu").append(`<div class="dropdown-divider"></div>
        <a class="dropdown-item" href="/">View All</a>`);

        });
};

cityDropDown();
changeCity();


// There should be a form for a user to add more restaurants with a <select> element for picking which city the new restaurant is in and all other required fields. When the user submits this form, the restaurant should appear on the page(unless the view is currently filtered to show a city where the newly restaurant is not in). All fields in the form should also be cleared so that the form is ready for the user to add the next restaurant.

// Provide a way for the user to add new cities. You can either add another form on the page or incorporate it into the existing form for adding restaurants.


// Add a way for a user to filter restaurants by rating.