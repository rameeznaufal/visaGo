const db = require('../config/db');

class s_reward{
    constructor(title, category, desc, storeid){
        this.title = title,
        this.category = category
        this.desc = desc,
        this.storeid = storeid
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
                storeid
            )
            VALUES(
                '${this.title}',
                '${this.category}',
                '${this.desc}',
                '${this.storeid}'
            );
        `;

        return db.execute(sql);
    }

    find(){
        let sql = `
            SELECT * FROM s_reward WHERE storeid = "${this.storeid}";
        `;
        return db.execute(sql);
    }
}

module.exports = s_reward;

