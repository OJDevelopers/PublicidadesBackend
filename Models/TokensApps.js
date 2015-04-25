exports = module.exports = function(app, mongoose) {
  var GeographySchema = new mongoose.Schema({
      Name: String,
      PrivateToken: String,
      PublicToken: String

  });

  mongoose.model('TokensApp', GeographySchema);
};