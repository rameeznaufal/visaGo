const db = require('../config/db');

class u_reward{
    constructor(title, category, desc, storeid, userid, enddate){
        this.title = title,
        this.category = category
        this.desc = desc,
        this.storeid = storeid,
        this.userid = userid,
        this.enddate = enddate
    }

    create(){
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let date = d.getDate();

        let createAtDate = `${year}-${month}-${date}`;
        let sql = `
            INSERT INTO users(
                title,
                category,
                desc,
                storeid,
                userid,
                enddate
            )
            VALUES(
                '${this.title}',
                '${this.category}',
                '${this.desc}',
                '${this.storeid}',
                '${this.userid}',
                '${this.enddate}'
            );
        `;

        return db.execute(sql);
    }

    find(){
        let sql = `
            SELECT * FROM u_reward WHERE userid = "${this.userid}";
        `;
        return db.execute(sql);
    }
}

module.exports = u_reward;

