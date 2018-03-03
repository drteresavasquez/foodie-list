# FOODIE APP
Foodie, a single page web app, allows users to add and view all the restaurants they have been to with ratings. It also allows the user to filter restaurants by city. Users can also add additional cities and the purpose of their trip.

## Setup
To clone this project, run the following in your command line.
```
git clone https://github.com/drteresavasquez/foodie-list.git
cd foodie-list
cd lib
npm install
grunt
hs -o
```

## Data
You may either use the local data or upload to Firebase, which is what this project uses to access the data.

If you choose to use the local data, you will need to update the calls to the JSON files and update the data that is returned in the promise.

Currently, using Firebase, the call looks like this:
```
function getData(file) {
    return $.ajax({
        url: file
    });
}

getData(`${firebaseURL}restaurants.json`)
        .then((data) => {
            console.log(data);
        });
```
To use local data, the call would look like this:
```
function getData(file) {
    return $.ajax({
        url: file
    });
}

getData(`data/restaurants.json`)
        .then((data) => {
            console.log(data);
        });
```
You will need to update the content of the functions in order to use the local data. 

## Built With

* Bootstrap 4
* Firebase
* JavaScript/JQuery

## Authors

* **Dr. Teresa Vasquez** - *Initial work* - [GitHub](https://github.com/drteresavasquez)