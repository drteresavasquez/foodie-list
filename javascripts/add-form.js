"use strict";

let fbCalls = require("./firebase-calls"),
    firebase = "https://exercisedb-20924.firebaseio.com/foodie/",
    addCity = require("./add-city"),
    addRest = require("./add-restaurant"),
    $ = require("jquery");

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
                addRest.addRestaurant();
                break;
            case "2":
                addCity.addCity();
                break;
        }
    });
}

module.exports = {
    formPage,
};