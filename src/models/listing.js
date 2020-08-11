module.exports = (sequelize, DataTypes) => {
  const schema = {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
  };

  const ListingModel = sequelize.define('Listing', schema);
  return ListingModel;
};
