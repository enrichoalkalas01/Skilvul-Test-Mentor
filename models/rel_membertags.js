'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rel_membertags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.rel_membertags.belongsTo(models.members
        ,{
          foreignKey: 'members_id',
          as: 'member'
        }
      )

      models.rel_membertags.hasOne(models.tags
        ,{
          foreignKey: 'tags_id',
          as: 'tags_data'
        }
      )
    }
  }
  rel_membertags.init({
    members_id: DataTypes.INTEGER,
    tags_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'rel_membertags',
    modelName: 'rel_membertags',
  });
  return rel_membertags;
};