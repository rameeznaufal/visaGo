const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

//require('dotenv').config()

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");
const rewards = db.rewards;
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "merchant"
  });
 
  Role.create({
    id: 2,
    name: "buyer"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

 merchant1 = null;
  merchant2 = null;
  merchant3 = null;
  //Sample users
  db.user.create({
    id: 1,
    username: "rameez",
    email: "rameez@gmail.com",
    password: bcrypt.hashSync("rameez123", 8),
    address: "123, abc street, xyz city",
    phone: "1234567890",
    transaction_points: 58,
  }).then(user => {
    user.setRoles([2]);
  });

  db.user.create({
    id: 2,
    username: "anisha",
    email: "anisha@gmail.com",
    password: bcrypt.hashSync("anisha123", 8),
    address: "123, abc street, xyz city",
    phone: "1234567890",
    transaction_points: 98,
  }).then(user => {
    user.setRoles([2]);
  });

  db.user.create({
    id: 3,
    username: "akash",
    email: "akash@gmail.com",
    password: bcrypt.hashSync("akash123", 8),
    address: "234, abc street, xyz city",
    store_name: "Akash Store",
    lat: 12.345,
    lng: 67.890,
    rating: 4.5,
    descp: "We sell everything",
    phone: "1234567890",
  }).then(user => {
    user.setRoles([1]);
    merchant1 = user;
  });

  

  db.user.create({
    id: 4,
    username: "siftee",
    email: "siftee@gmail.com",
    password: bcrypt.hashSync("siftee123", 8),
    address: "234, abc street, xyz city",
    store_name: "Siftee Store",
    lat: 67.890,
    lng: 87.890,
    rating: 8,
    descp: "We sell everything which is not sold by Akash Store",
    phone: "1234567890",
  }).then(user => {
    user.setRoles([1]);
  });

  db.user.create({
    id: 5,
    username: "devang",
    email: "devang@gmail.com",
    password: bcrypt.hashSync("devang123", 8),
    address: "934, abc street, xyz city",
    store_name: "Devang Store",
    lat: 64.890,
    lng: 46.890,
    rating: 7,
    descp: "We sell everything which is not sold by Akash Store and Siftee Store",
    phone: "1234567890",
  }).then(user => {
    user.setRoles([1]);
  });

  db.user.create({
    id: 6,
    username: "sejal",
    email: "sejal@gmail.com",
    password: bcrypt.hashSync("sejal123", 8),
    address: "234, abc street, xyz city",
    phone: "1234567890",
    transaction_points: 998,
  }).then(user => {
    user.setRoles([2]);
  });

  db.mrewards.create({
    title: "Buy 1 Get 1 Free",
    descr: "Buy 1 Get 1 Free on all products",
    category: "Reward",
    enddate: "2021-05-31",
    uid: 3,
  });

  db.mrewards.create({
    title: "50% off on all products",
    descr: "50% off on all products",
    category: "Discount",
    enddate: "2021-05-31",
    uid: 3,
  });

  db.mrewards.create({
    title: "500Rs Cashback",
    descr: "500Rs Cashback on all products",
    category: "Cashback",
    enddate: "2021-05-31",
    uid: 3,
  });

  db.mrewards.create({
    title: "Buy 1 Get 1 Free",
    descr: "Buy 1 Get 1 Free on all products",
    category: "Reward",
    enddate: "2021-05-31",
    uid: 4,
  });

  db.mrewards.create({
    title: "50% off on all products",
    descr: "50% off on all products",
    category: "Discount",
    enddate: "2021-05-31",
    uid: 5,
  });

  db.mrewards.create({
    title: "500Rs Cashback",
    descr: "500Rs Cashback on all products",
    category: "Cashback",
    enddate: "2021-05-31",
    uid: 4,
  });



}

// simple route
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});