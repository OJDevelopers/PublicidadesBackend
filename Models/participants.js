exports = module.exports = function(app, mongoose) {
  var TEventSchema = new mongoose.Schema({
      Name: String,
      IdAdvertising: String,
      IdFacebook: String,
      IdTwitter: String,
      Image: String

  });

  mongoose.model('Participants', TEventSchema);
};