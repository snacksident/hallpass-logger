'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classrooms_students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  classrooms_students.init({
    classId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classrooms_students',
  });
  return classrooms_students;
};