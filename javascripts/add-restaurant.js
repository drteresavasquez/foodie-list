"use strict";

let fbCalls = require("./firebase-calls"),
    firebase = "https://exercisedb-20924.firebaseio.com/foodie/",
    $ = require("jquery");

function addRestaurant() {
    $(".container").html("");
    let ids = [];
    fbCalls.getData(`${firebase}restaurants.json`)
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

            fbCalls.getData(`${firebase}cities.json`)
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
            <input id="date" type="date" data-placeholder="Date of Visit>"
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
                if ($("#restName").val() === "" ||
                    $("#addRestCity").val() === "" ||
                    $("#date").val() === "" ||
                    $("input[name='rating']").val() === "") {
                    window.alert("Please Complete All Options");
                } else {
                    let newRestObj = {
                        "id": itemID,
                        "restaurant": $("#restName").val(),
                        "city_id": parseInt($("#addRestCity").val()),
                        "date_visited": $("#date").val(),
                        "my_rating": parseInt($("input[name='rating']:checked").val())
                    };
                    console.log(newRestObj);
                    fbCalls.addData(newRestObj, "restaurants.json");

                    $("#restName").val("");
                    $("#addRestCity").val("");
                    $("#date").val("");
                    $("input[name='rating']").val("");
                }
            });
        });
}

module.exports = {
    addRestaurant,
};