module.exports = (sequelize, DataTypes) => {
  const schema = {
    imgref: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
  };

  const ListingModel = sequelize.define('Listing', schema);
  return ListingModel;
};
