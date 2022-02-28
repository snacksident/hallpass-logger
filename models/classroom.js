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
      //has associations
      models.classroom.hasMany(model.student,{through: classes_students})

      //belongs-to associations 
      models.classroom.belongsTo(model.hallpass)
      models.classroom.belongsTo(models.user)
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