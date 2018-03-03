"use strict";

let firebase = "https://exercisedb-20924.firebaseio.com/foodie/",
    $ = require('jquery'),
    fbCalls = require("./firebase-calls"),
    foodie = require("./foodie-list");

let changeCity = () => {
    $(".container").html("");
    let url = window.location.href;
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    if (queryString !== undefined) {
        fbCalls.getData(`${firebase}restaurants.json?orderBy="city_id"&equalTo=${queryString}`)
            .then((data) => {
                if (Object.keys(data).length == 0) {
                    console.log("nothing here");
                    $("#carouselExampleControls").css({
                        "display": "none"
                    });
                    $(".container").prepend(`<div id="emptySelection"><img src="./images/empty-rest.jpeg"><h3>You Have No Restaurants In This City</h3>
                    </div>`);
                } else {
                    //Add City Heading to Page
                    fbCalls.getData(`${firebase}cities.json?orderBy="id"&equalTo=${queryString}`)
                        .then((city) => {
                            let keys = Object.keys(city);
                            keys.forEach((item) => {
                                $(".list-group").prepend(`<li class="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                                <h5>City: ${city[item].city}<h5>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                <p class="reason">Reason for Visit: ${city[item].trip_purpose}</p>
                                </li>`);
                            });
                        });
                    //END

                    //Begin DOM Manipulation
                    $(".container").html("");
                    $("#carouselExampleControls").css({
                        "display": "none"
                    });
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
                    `);
                        if (data[item].city_id === 7) {
                            $("#restHeader").append(" (Hometown)");
                        }
                    });
                    $(".container").append(`</ul>`);
                }
            });
    } else {
        foodie.showSortedRestaurants();
    }
};

changeCity();