const db = require('../config/db');

class User{
    constructor(storename, owner, desc, email, contact, password, latitude, longitude){
        this.storename = storename,
        this.owner = owner,
        this.desc = desc,
        this.email = email,
        this.contact = contact,
        this.password = password,
        this.latitude = latitude,
        this.longitude = longitude
    }

    create(){
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let date = d.getDate();

        let createAtDate = `${year}-${month}-${date}`;
        let sql = `
            INSERT INTO users(
                storename,
                owner,
                desc,
                email,
                contact,
                password,
                latitude,
                longitude
            )
            VALUES(
                '${this.storename}',
                '${this.owner}',
                '${this.desc}',
                '${this.email}',
                '${this.contact}',
                '${this.password}',
                '${this.latitude}',
                '${this.longitude}'
            );
        `;

        return db.execute(sql);
    }

    find(){
        let sql = `
            SELECT * FROM store WHERE email = "${this.email}";
        `;
        return db.execute(sql);
    }
}

module.exports = User;

