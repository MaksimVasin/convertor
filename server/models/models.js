const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const Image = sequelize.define('image', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
  filename: {type: DataTypes.STRING},
  dataSVG: {type: DataTypes.STRING},
  dataPNG: {type: DataTypes.STRING},
  userId: {type: DataTypes.INTEGER},
})

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  login: {type: DataTypes.STRING, unique: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'user'},
  imagesIds: {type: DataTypes.STRING}, // Строка с id изображений пользователя
})

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// Cвязи между моделями
User.hasMany(Image); // Каждый пользователь может иметь несколько изображений
Image.belongsTo(User); // Каждое изображение принадлежит одному пользователю

module.exports = {
  User, Type, Image
}