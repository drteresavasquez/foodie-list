"use strict";

let fbCalls = require("./firebase-calls"),
    firebase = "https://exercisedb-20924.firebaseio.com/foodie/",
    $ = require("jquery");

function addCity() {
    $(".container").html("");
    let ids = [];
    fbCalls.getData(`${firebase}cities.json`)
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
                if($("#cityName").val()=== "" || $("#tripPurpose").val() === ""){
                    window.alert("Please Enter A Valid City or Trip Purpose");
                }else{
                let newCityObj = {
                    "id": itemID,
                    "city": $("#cityName").val(),
                    "trip_purpose": $("#tripPurpose").val()
                };
                console.log(newCityObj);
                fbCalls.addData(newCityObj, "cities.json");

                $("#cityName").val("");
                $("#tripPurpose").val("");
            }
            });

        });
}

module.exports = {
    addCity,
};