"use strict";

let firebase = "https://exercisedb-20924.firebaseio.com/foodie/",
    $ = require('jquery'),
    fbCalls = require("./firebase-calls");
    
let cityDropDown = () => {
    fbCalls.getData(`${firebase}cities.json`)
        .then((data) => {
            let keys = Object.keys(data);
            keys.forEach((item) => {
                let eachCity = data[item];
                $(".dropdown-menu").append(`
            <a class="dropdown-item" href="?${eachCity.id}" id="${eachCity.id}">${eachCity.city}</a>`);
            });
            $(".dropdown-menu").append(`<div class="dropdown-divider"></div>
        <a class="dropdown-item" href="https://drteresavasquez.github.io/foodie-list">View All</a>`);
        });
};
cityDropDown();