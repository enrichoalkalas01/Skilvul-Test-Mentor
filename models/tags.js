'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.tags.belongsTo(models.rel_membertags
        ,{
          foreignKey: 'tags_id',
          as: 'member_tags'
        }
      )
    }
  }
  tags.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'tags',
    modelName: 'tags',
  });
  return tags;
};