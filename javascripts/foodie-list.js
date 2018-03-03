"use strict";
console.log("foodie-list.js");

let firebase = "https://exercisedb-20924.firebaseio.com/foodie/";
let $ = require('jquery');

$("#addRest").css({
    "cursor": "pointer"
});
$("#addRest").on("click", formPage);

function getData(file) {
    return $.ajax({
        url: file
    });
}

function addData(obj, url) {
    $.ajax({
        url: `${firebase}${url}`,
        type: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json'
    }).done((objID) => {
        console.log(objID);
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

let changeCity = () => {
    $(".container").html("");
    let url = window.location.href;
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    if (queryString !== undefined) {
        getData(`${firebase}restaurants.json?orderBy="city_id"&equalTo=${queryString}`)
            .then((data) => {

                //Add City Heading to Page
                getData(`${firebase}cities.json?orderBy="id"&equalTo=${queryString}`)
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

function formPage() {
    console.log("object");
    $(".container").html("");
    $(".container").append(`
    <select class="custom-select">
        <option selected>What Would You Like to Add?</option>
        <option value="1">Restaurant</option>
        <option value="2">City</option>
    </select>`);

    $(".custom-select").change(function (event) {
        let val = event.target.value;
        switch (val) {
            case "1":
                addRestaurant();
                break;
            case "2":
                addCity();
                break;
        }
    });
}

function addCity() {
    formPage();
    let ids = [];
    getData(`${firebase}cities.json`)
        .then((data) => {
            let keys = Object.keys(data);
            keys.forEach((item) => {
                ids.push(data[item].id);
            });
            let itemID = ids.pop() + 1;

            //Header
            $(".container").append(`
         <h5 class="formHeader">Add a City</h5>
         <form id="add-city">`);

            //City Name
            $(".container").append(`<div class="form-group">
         <input type="text" class="form-control" id="cityName" placeholder="Enter City Name">
       </div>`);

            //Trip Purpose
            $(".container").append(`<div class="form-group">
       <input type="text" class="form-control" id="tripPurpose" placeholder="What was the purpose of your trip?">
     </div>`);

            //Submit button
            $(".container").append(` <button id="submit" type="submit" class="btn btn-dark volunteer-form-submit-button">Submit</button>
            </form>
            `);

            $("#submit").click(function (event) {
                let newCityObj = {
                    "id": itemID,
                    "city": $("#cityName").val(),
                    "trip_purpose": $("#tripPurpose").val()
                };
                console.log(newCityObj);
                addData(newCityObj, "cities.json");

                $("#cityName").val("");
                $("#tripPurpose").val("");
            });

        });
}

function addRestaurant() {
    formPage();
    let ids = [];
    getData(`${firebase}restaurants.json`)
        .then((data) => {
            let keys = Object.keys(data);
            keys.forEach((item) => {
                ids.push(data[item].id);
            });
            let itemID = ids.pop() + 1;

            //Header
            $(".container").append(`
            <h5 class="formHeader">Add a Restaurant</h5>
            <form id="add-restaurant">`);

            //Rest Name
            $(".container").append(`<div class="form-group">
              <input type="text" class="form-control" id="restName" placeholder="Enter Restaurant Name">
            </div>`);

            //city
            $(".container").append(`<select class="custom-select mb-3" id="addRestCity">
            <option selected>Select a City</option>
            </select>`);

            getData(`${firebase}cities.json`)
                .then((data) => {
                    let keys = Object.keys(data);
                    keys.forEach((item) => {
                        let eachCity = data[item];
                        $("#addRestCity").append(`<option value="${eachCity.id}">${eachCity.city}</option>`);
                    });
                });

            //Date
            $(".container").append(`<h5>Date Visited</h5>`);

            $(".container").append(`<div class="form-group">
            <input id="date" type="date">
          </div>`);


            // Rating
            $(".container").append(`
                <h5>Rate the Spot</h5>`);
            let ratings = [1, 2, 3, 4, 5];
            ratings.forEach((num) => {
                $(".container").append(`
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="rating" id="rating" value=${num}>
                <label class="form-check-label" for="inlineRadio1">${num}</label>
                </div>`);
            });

            //Submit button
            $(".container").append(` <button id="submit" type="submit" class="btn btn-dark volunteer-form-submit-button">Submit</button>
          </form>
            `);

            $("#submit").click(function (event) {
                let newRestObj = {
                    "id": itemID,
                    "restaurant": $("#restName").val(),
                    "city_id": parseInt($("#addRestCity").val()),
                    "date_visited": $("#date").val(),
                    "my_rating": parseInt($("input[name='rating']:checked").val())
                };
                console.log(newRestObj);
                addData(newRestObj, "restaurants.json");

                $("#restName").val("");
                $("#addRestCity").val("");
                $("#date").val("");
                $("input[name='rating']").val("");
            });
        });
}


// Add a way for a user to filter restaurants by rating.