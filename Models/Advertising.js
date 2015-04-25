exports = module.exports = function(app, mongoose) {
  var AdvertisingSchema = new mongoose.Schema({
      Name: String,
      Logo: String,
      Background: String,
      Color: String,
      Awards: [
          {
              Name: String,
              Description: String,
              Image: String,
              Link: String
          }
      ],
      TokenApp: String,
      FacebookPerfil: String,
      TwitterPerfil:String
  });

  mongoose.model('Advertising', AdvertisingSchema);
};