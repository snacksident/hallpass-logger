'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //M:M association with students via classrooms_students join table
      models.classroom.belongsToMany(models.student, {through: 'classrooms_students'})


      models.classroom.hasMany(models.hallpass)
      //1:M assoc with hallpass
      // models.classroom.belongsTo(models.hallpass)
      //1:M assoc with user
      // models.classroom.belongsTo(models.user)
    }
  }
  classroom.init({
    userId: DataTypes.INTEGER,
    class_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classroom',
  });
  return classroom;
};