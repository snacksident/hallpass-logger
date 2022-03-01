'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hallpass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //1:m with students
      // models.hallpass.hasMany(models.student)
      //1:m with clasrooms
      // models.hallpass.hasMany(models.classroom)
    }
  }
  hallpass.init({
    classId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'hallpass',
  });
  return hallpass;
};