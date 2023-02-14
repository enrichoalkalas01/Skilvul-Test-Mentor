'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.members.hasMany(models.rel_membertags
        ,{
          foreignKey: 'members_id',
          as: 'member_tags'
        }
      )
    }
  }
  members.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    exp: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'members',
    modelName: 'members',
  });
  return members;
};