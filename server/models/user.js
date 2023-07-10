const db = require('../config/db');

class User{
    constructor(username, fullname, email, contact, password){
        this.username = username,
        this.fullname = fullname
        this.email = email,
        this.contact = contact,
        this.password = password
    }

    create(){
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let date = d.getDate();

        let createAtDate = `${year}-${month}-${date}`;
        let sql = `
            INSERT INTO users(
                username,
                fullname,
                email,
                contact,
                password
            )
            VALUES(
                '${this.username}',
                '${this.fullname}',
                '${this.email}',
                '${this.contact}',
                '${this.password}'
            );
        `;

        return db.execute(sql);
    }

    find(){
        let sql = `
            SELECT * FROM user WHERE email = "${this.email}";
        `;
        return db.execute(sql);
    }
}

module.exports = User;

