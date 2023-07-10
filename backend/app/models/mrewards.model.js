
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("mrewards", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      descr: {
        type: Sequelize.STRING
      },
      enddate: {
        type: Sequelize.DATE
        },
      uid: {
        type: Sequelize.INTEGER
      }
    });
  
    return Role;
  };