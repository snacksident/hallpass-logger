'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // M:M with classrooms
      models.student.belongsToMany(models.classroom, {through: 'classrooms_students'})


      models.student.hasMany(models.hallpass)
      //1:M with hallpass
      // models.student.belongsTo(models.hallpass)
    }
  }
  student.init({
    classId: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};