'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class details_of_borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.borrow, {foreignKey: `borrowID`}),
      this.belongsTo(models.book, {foreignKey: `bookID`})
    }
  }
  details_of_borrow.init({
    borrowID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'borrows',
        key: 'id'
      }
    },
    bookID: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'details_of_borrow',
  });
  return details_of_borrow;
};