"use strict";

let firebase = "https://exercisedb-20924.firebaseio.com/foodie/";
let $ = require('jquery');

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
module.exports = {
    getData,
    addData
};