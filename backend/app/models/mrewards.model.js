
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("mrewards", {
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
        type: Sequelize.STRING
        },
      uid: {
        type: Sequelize.INTEGER
      }
    });
  
    return Role;
  };