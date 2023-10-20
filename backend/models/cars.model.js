module.exports = (sequelize, Sequelize) => {
  const Cars = sequelize.define("car", {
    brand: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    motor: {
      type: Sequelize.STRING
    },
    // DECOMMENT:
    filename: {
      type: Sequelize.STRING
    }
  });

  return Cars;
}