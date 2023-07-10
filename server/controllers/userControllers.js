const db = require('../config/db');

exports.getUserById = (req, res, next, id) => {
    req.userId = id;
    next();
}

exports.getUser = (req,res) => {
    const {userId} = req;
    console.log(userId);
    let sql = `SELECT * FROM user WHERE id = ${userId};`;

    db.execute(sql)
    .then((r)=>{
        console.log(r[0]);
        res.json(r);
    }).catch((e) => {
        if(e){
            res.status(400).json({"err" : "Failed", e});
        }
    });
}