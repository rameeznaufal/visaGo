const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const db = require('../config/db');


exports.signup = (req,res) => {
    const {username, fullname, email, contact, password} = req.body;
    console.log(username, email, contact, password);
    bcrypt.hash(password,10)
    .then((hash) => {
        let user = new User(username, fullname, email, contact, hash);
        let sql = `SELECT * FROM user WHERE email = "${email}";`;
        db.execute(sql)
        .then((resp) => {
            if(resp[0].length > 0){
                res.status(201).json({"err" : "Failed", e});
            }else{
                user.create()
                .then((r) => {
                    res.json("Signed Up Done!!!");
                }).catch((e) => {
                    if(e){
                        res.status(400).json({"err" : "Failed", e});
                    }
                });
            }
        }).catch((e) => {
            if(e){
                res.status(400).json({"err" : "Failed", e});
            }
        });
    });
}

exports.signin = async (req,res) => {
    const {email, password} = req.body;
    console.log(email,password);
    let user =  new User("", "",email,"","");
    console.log('user',user);
    user.find()
    .then((u) => {
        console.log('u',u[0])
        if(u[0].length > 0){
            bcrypt.compare(password, u[0][0].password, (error, response) => {
                console.log(response);
                if(response){
                    const token = jwt.sign({ _id: u[0][0].id }, 'shhhhh', { algorithm : 'HS256' });
                    res.cookie("token", token, { expire: new Date() + 9999 });
                    const { id, username, email, contact } = u[0][0];
                    res.status(200).json({ token, user: { id, username, email, contact} });
                }else{
                    res.status(201).json({"err" : "Incorrect Password"});
                }
            })
        }else{
            res.status(202).json({"err" : "User Does Not Exits" });
        }
    })
    .catch((err) => {
        if(err){
            res.json({error: err});
        }
    })
}

exports.isSignedIn = expressJwt({
    secret: 'shhhhh',
    algorithms: ['HS256'],
    userProperty: "auth"
});

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signout successfully"
    });
}

// exports.isAuthenticated = (req, res, next) => {
//     let checker = req.profile && req.auth && req.profile._id == req.auth._id;
//     if (!checker) {
//         return res.status(403).json({
//             error: "ACCESS DENIED"
//         });
//     };
//     next();
// };