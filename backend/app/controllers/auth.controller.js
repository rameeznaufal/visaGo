const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Rewards = db.mrewards;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.role) {
        Role.findAll({
          where: {
            name: req.body.role
          }
        }).then(role => {
          user.setRoles(role).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 2 (buyer)
        user.setRoles([2]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
      var Rew = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name.toUpperCase());
        }
      });
       Rewards.findAll({
        where: {
          uid: user.id
        }
      }).then(rewards => {
        for (let i = 0; i < rewards.length; i++) {
          //console.log(rewards[i]);
          Rew.push(rewards[i]);
        }
      


        
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          store_name: user.store_name,
          lat: user.lat,
          lng: user.lng,
          address: user.address,
          phone: user.phone,
          transaction_points: user.transaction_points,
          rating: user.rating,
          rew: Rew,
          descp: user.descp,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};