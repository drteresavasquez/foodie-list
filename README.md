# FOODIE
Foodie, a single page web app, allows users to add and view all the restaurants they have been to with ratings. It also allows the user to filter restaurants by city. Users can also add additional cities and the purpose of their trip.

## Demo

### Home Screen
![alt text](./images/home.jpeg)

### Filter By City
![alt text](./images/city-filter.jpeg)

### View By City
![alt text](./images/city-view.jpeg)

### Add Either Restaurant or City
![alt text](./images/add.jpeg)

### Add Restaurant
![alt text](./images/add-rest.jpeg)

### Add City
![alt text](./images/add-city.jpeg)

## Project Setup
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
```Javascript
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
```Javascript
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
You will need to update the content of the functions in order to parse the local data. 

### Add Data to Firebase
Create a new DB and upload the foodie.json.

Update your database rules to the following:
```JSON
{
  "rules": {
    ".read": true,
    ".write": true,
      "foodie":{
          "restaurants": {
                ".indexOn": ["city_id","my_rating","restaurant"]
              },
            "cities": {
                ".indexOn": ["id","city"]
              }
        }
    }
  }
```
Setup permissions to allow `localhost` to access the database under authorization and Authorized domains.

Here is what the data looks like:
```JSON
{
    "restaurants": [
      {
        "id": 1,
        "restaurant": "Schaefer, DuBuque and Satterfield",
        "city_id": 4,
        "date_visited": "6/25/2017",
        "my_rating": 4.52
      }, {
        "id": 2,
        "restaurant": "Hegmann-Kuphal",
        "city_id": 5,
        "date_visited": "7/3/2016",
        "my_rating": 1.26
      }, {
        "id": 3,
        "restaurant": "Bergnaum-Bradtke",
        "city_id": 3,
        "date_visited": "3/20/2016",
        "my_rating": 2.87
      }, {
        "id": 4,
        "restaurant": "Weissnat LLC",
        "city_id": 4,
        "date_visited": "11/29/2015",
        "my_rating": 6.18
      }, {
        "id": 5,
        "restaurant": "Farrell, Wunsch and Schmidt",
        "city_id": 10,
        "date_visited": "10/9/2015",
        "my_rating": 7.93
      }, {
        "id": 6,
        "restaurant": "Romaguera Group",
        "city_id": 2,
        "date_visited": "12/30/2016",
        "my_rating": 3.09
      }, {
        "id": 7,
        "restaurant": "Kovacek Inc",
        "city_id": 1,
        "date_visited": "5/29/2017",
        "my_rating": 6.87
      }, {
        "id": 8,
        "restaurant": "Kessler-Bahringer",
        "city_id": 7,
        "date_visited": "6/6/2017",
        "my_rating": 1.91
      }, {
        "id": 9,
        "restaurant": "Dickens, Pacocha and Cronin",
        "city_id": 3,
        "date_visited": "8/4/2016",
        "my_rating": 4.69
      }, {
        "id": 10,
        "restaurant": "Steuber Group",
        "city_id": 8,
        "date_visited": "6/5/2016",
        "my_rating": 8.08
      }, {
        "id": 11,
        "restaurant": "Lind-Wilderman",
        "city_id": 11,
        "date_visited": "11/16/2016",
        "my_rating": 1.66
      }, {
        "id": 12,
        "restaurant": "Koch, Stehr and Koepp",
        "city_id": 11,
        "date_visited": "11/19/2017",
        "my_rating": 1.78
      }, {
        "id": 13,
        "restaurant": "Okuneva, Langosh and Ebert",
        "city_id": 9,
        "date_visited": "7/14/2015",
        "my_rating": 5.7
      }, {
        "id": 14,
        "restaurant": "Heidenreich-Ziemann",
        "city_id": 5,
        "date_visited": "1/29/2017",
        "my_rating": 5.99
      }, {
        "id": 15,
        "restaurant": "Strosin Inc",
        "city_id": 5,
        "date_visited": "8/25/2015",
        "my_rating": 5.24
      }, {
        "id": 16,
        "restaurant": "Harris and Sons",
        "city_id": 4,
        "date_visited": "3/29/2016",
        "my_rating": 4.06
      }, {
        "id": 17,
        "restaurant": "Kuhlman, Mraz and Lakin",
        "city_id": 9,
        "date_visited": "8/20/2016",
        "my_rating": 3.64
      }, {
        "id": 18,
        "restaurant": "Cronin Group",
        "city_id": 5,
        "date_visited": "4/6/2017",
        "my_rating": 6.2
      }, {
        "id": 19,
        "restaurant": "Baumbach-Beier",
        "city_id": 2,
        "date_visited": "12/16/2015",
        "my_rating": 2.25
      }, {
        "id": 20,
        "restaurant": "Durgan, Feest and Jast",
        "city_id": 8,
        "date_visited": "1/25/2017",
        "my_rating": 6.63
      }, {
        "id": 21,
        "restaurant": "Bartoletti-Gislason",
        "city_id": 9,
        "date_visited": "1/3/2018",
        "my_rating": 8.3
      }, {
        "id": 22,
        "restaurant": "Lind, Rempel and Legros",
        "city_id": 3,
        "date_visited": "1/15/2017",
        "my_rating": 8.23
      }, {
        "id": 23,
        "restaurant": "Boyer-Kuphal",
        "city_id": 3,
        "date_visited": "10/29/2016",
        "my_rating": 5.52
      }, {
        "id": 24,
        "restaurant": "Bins-Cole",
        "city_id": 6,
        "date_visited": "1/21/2018",
        "my_rating": 4.33
      }, {
        "id": 25,
        "restaurant": "Swift Inc",
        "city_id": 4,
        "date_visited": "2/8/2016",
        "my_rating": 3.42
      }, {
        "id": 26,
        "restaurant": "Bergnaum-Waters",
        "city_id": 9,
        "date_visited": "8/12/2017",
        "my_rating": 5.99
      }, {
        "id": 27,
        "restaurant": "Hayes Group",
        "city_id": 3,
        "date_visited": "2/25/2017",
        "my_rating": 4.65
      }, {
        "id": 28,
        "restaurant": "Walter-Lubowitz",
        "city_id": 4,
        "date_visited": "2/7/2018",
        "my_rating": 1.18
      }, {
        "id": 29,
        "restaurant": "Hayes-Lang",
        "city_id": 10,
        "date_visited": "2/24/2016",
        "my_rating": 2.57
      }, {
        "id": 30,
        "restaurant": "Schroeder-Kozey",
        "city_id": 5,
        "date_visited": "3/18/2017",
        "my_rating": 3.29
      }, {
        "id": 31,
        "restaurant": "Rodriguez, Jones and Rath",
        "city_id": 3,
        "date_visited": "3/14/2016",
        "my_rating": 6.0
      }, {
        "id": 32,
        "restaurant": "Jacobi-Price",
        "city_id": 11,
        "date_visited": "9/13/2015",
        "my_rating": 1.85
      }, {
        "id": 33,
        "restaurant": "Metz, White and Lowe",
        "city_id": 8,
        "date_visited": "10/7/2015",
        "my_rating": 1.85
      }
    ],
    "cities": [
        {
          "id": 1,
          "city": "Itupeva",
          "trip_purpose": "lectus vestibulum quam sapien varius ut blandit non interdum in"
        }, {
          "id": 2,
          "city": "Changsheng",
          "trip_purpose": "blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu"
        }, {
          "id": 3,
          "city": "Mingelchaur",
          "trip_purpose": "odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel"
        }, {
          "id": 4,
          "city": "Bigoudine",
          "trip_purpose": "eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec"
        }, {
          "id": 5,
          "city": "La Soledad",
          "trip_purpose": "dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat"
        }, {
          "id": 6,
          "city": "Shengshan",
          "trip_purpose": "mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id"
        }, {
          "id": 7,
          "city": "Nashville",
          "trip_purpose": "magna ac consequat metus sapien ut nunc vestibulum ante ipsum"
        }, {
          "id": 8,
          "city": "Rabat",
          "trip_purpose": "quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo"
        }, {
          "id": 9,
          "city": "Hamilton",
          "trip_purpose": "vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac"
        }, {
          "id": 10,
          "city": "El Llano",
          "trip_purpose": "augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec"
        }, {
          "id": 11,
          "city": "Longwu",
          "trip_purpose": "felis donec semper sapien a libero nam dui proin leo odio porttitor"
        }
      ]
  }
```

## Built With

* Bootstrap 4
* Firebase
* JavaScript/JQuery

## Contributors

* **Dr. Teresa Vasquez** - *Initial work* - [GitHub](https://github.com/drteresavasquez)
