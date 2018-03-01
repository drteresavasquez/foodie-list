"use strict";
console.log("foodie-list.js");

let firebase = "https://exercisedb-20924.firebaseio.com/foodie/";

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
        resolve(objID);
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
                addRestaurant()
                break;
            case "2":
                addCity();
                break;
        }
    });
};

function addCity() {
    formPage();
    $(".container").append(`ADD CITY FORM HERE`);



    //CITIES OBJ
    // "id": 1,
    // "city": "Itupeva",
    // "trip_purpose": "lectus vestibulum quam sapien varius ut blandit non interdum in"

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
            $(".container").append(`
            <h5>Add a Restaurant</h5>
            <form class = "add-restaurant">
            <div class="form-group">
              <label for="name">Restaurant Name</label>
              <input type="text" class="form-control" id="volunteerFormName" placeholder="Name">
            </div>
            <div class="form-group">
              <label for="date_visited">Date Visited</label>
              <input type="date_visited" class="form-control" id="volunteerFormEmail" placeholder="Date" required>
            </div>
            <div class="form-group">
              <label for="message">Your Rating</label>
              <input type="text" class="form-control" id="volunteerFormTime" placeholder="1-5">
            </div>
            <button type="submit" class="btn btn-dark volunteer-form-submit-button">Submit</button>
          </form>
            `);
        });


    // OBJECT REST
    //     "id": 1,
    //     "restaurant": "Schaefer, DuBuque and Satterfield",
    //     "city_id": 4,
    //     "date_visited": "6/25/2017",
    //     "my_rating": 4.52
}


// There should be a form for a user to add more restaurants with a <select> element for picking which city the new restaurant is in and all other required fields. When the user submits this form, the restaurant should appear on the page(unless the view is currently filtered to show a city where the newly restaurant is not in). All fields in the form should also be cleared so that the form is ready for the user to add the next restaurant.

// Provide a way for the user to add new cities. You can either add another form on the page or incorporate it into the existing form for adding restaurants.


// Add a way for a user to filter restaurants by rating.