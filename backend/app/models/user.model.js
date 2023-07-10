module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      store_name: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.DOUBLE
      },
      lng: {
        type: Sequelize.DOUBLE
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      transaction_points: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.DOUBLE(2,1)
      },
      descp: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };